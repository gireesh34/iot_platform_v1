-- Enable RLS on all tables
ALTER DATABASE postgres SET app.jwt_secret TO 'your-jwt-secret';

-- Create custom types for status
CREATE TYPE device_status AS ENUM ('online', 'offline', 'maintenance', 'error');
CREATE TYPE drone_status AS ENUM ('idle', 'flying', 'charging', 'maintenance', 'error');

-- Create devices table
CREATE TABLE IF NOT EXISTS public.devices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'offline',
    metadata JSONB,
    last_seen TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create drones table
CREATE TABLE IF NOT EXISTS public.drones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    status TEXT DEFAULT 'grounded',
    metadata JSONB,
    last_location JSONB,
    last_seen TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create telemetry table
CREATE TABLE IF NOT EXISTS public.telemetry (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    device_id UUID REFERENCES devices(id),
    drone_id UUID REFERENCES drones(id),
    data JSONB NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS devices_name_idx ON public.devices(name);
CREATE INDEX IF NOT EXISTS drones_name_idx ON public.drones(name);
CREATE INDEX IF NOT EXISTS telemetry_device_id_idx ON public.telemetry(device_id);
CREATE INDEX IF NOT EXISTS telemetry_drone_id_idx ON public.telemetry(drone_id);
CREATE INDEX IF NOT EXISTS telemetry_timestamp_idx ON public.telemetry(timestamp);

-- Enable Row Level Security
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own devices"
    ON public.devices
    FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can modify their own devices"
    ON public.devices
    FOR ALL
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can view their own drones"
    ON public.drones
    FOR SELECT
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can modify their own drones"
    ON public.drones
    FOR ALL
    USING (auth.uid() = owner_id);

CREATE POLICY "Users can view telemetry for their devices/drones"
    ON public.telemetry
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM devices WHERE id = device_id AND owner_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM drones WHERE id = drone_id AND owner_id = auth.uid()
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_devices_updated_at
    BEFORE UPDATE ON public.devices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drones_updated_at
    BEFORE UPDATE ON public.drones
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Grant appropriate permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO postgres;
