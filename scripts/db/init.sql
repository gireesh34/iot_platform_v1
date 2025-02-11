-- Create devices table if not exists
CREATE TABLE IF NOT EXISTS public.devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    status TEXT DEFAULT 'offline',
    metadata JSONB,
    last_seen TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create drones table if not exists
CREATE TABLE IF NOT EXISTS public.drones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    name TEXT NOT NULL,
    status TEXT DEFAULT 'grounded',
    metadata JSONB,
    last_location JSONB,
    last_seen TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create telemetry table if not exists
CREATE TABLE IF NOT EXISTS public.telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
CREATE INDEX IF NOT EXISTS idx_devices_user_id ON public.devices(user_id);
CREATE INDEX IF NOT EXISTS idx_drones_user_id ON public.drones(user_id);
CREATE INDEX IF NOT EXISTS idx_telemetry_device ON public.telemetry(device_id);
CREATE INDEX IF NOT EXISTS idx_telemetry_drone ON public.telemetry(drone_id);
CREATE INDEX IF NOT EXISTS idx_telemetry_timestamp ON public.telemetry(timestamp);

-- Enable Row Level Security (RLS)
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.telemetry ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own devices"
ON public.devices FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can modify their own devices"
ON public.devices FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own drones"
ON public.drones FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can modify their own drones"
ON public.drones FOR ALL
USING (auth.uid() = user_id);

CREATE POLICY "Users can view telemetry for their devices"
ON public.telemetry FOR SELECT
USING (EXISTS (
    SELECT 1 FROM devices WHERE id = device_id AND user_id = auth.uid()
) OR EXISTS (
    SELECT 1 FROM drones WHERE id = drone_id AND user_id = auth.uid()
));
