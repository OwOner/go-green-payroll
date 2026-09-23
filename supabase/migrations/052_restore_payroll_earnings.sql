-- Migration 052: Restore Payroll Earnings
-- Restoring the payroll_earnings table since manual bonuses and basic UI still rely on it.

CREATE TABLE public.payroll_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payroll_item_id UUID NOT NULL REFERENCES public.payroll_items(id) ON DELETE CASCADE,
    description TEXT NOT NULL, 
    amount NUMERIC(12,2) NOT NULL,
    
    -- Audit / Source Tracking
    source TEXT, 
    source_id TEXT, 
    
    -- Explicit Overrides
    calculated_amount NUMERIC(12,2),
    override_reason TEXT,
    override_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    override_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.payroll_earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to payroll_earnings for authenticated users" 
ON public.payroll_earnings 
FOR SELECT 
TO authenticated 
USING (true);

CREATE POLICY "Allow insert access to payroll_earnings for authenticated users" 
ON public.payroll_earnings 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow update access to payroll_earnings for authenticated users" 
ON public.payroll_earnings 
FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow delete access to payroll_earnings for authenticated users" 
ON public.payroll_earnings 
FOR DELETE 
TO authenticated 
USING (true);
