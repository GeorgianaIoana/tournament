-- Supabase Schema for Chess Tournament Registrations
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- Create registrations table
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Personal data
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    fide_id VARCHAR(10) NOT NULL,
    club VARCHAR(100) NOT NULL,

    -- Tournament
    category VARCHAR(50) NOT NULL, -- 'Open Șah Rapid' | 'Open Blitz' | 'Rapid + Blitz'
    amount_ron INTEGER NOT NULL,   -- in bani (22000 = 220 RON)

    -- Status
    status VARCHAR(20) DEFAULT 'pending', -- pending | paid | confirmed | cancelled
    is_free_entry BOOLEAN DEFAULT FALSE,
    free_entry_reason VARCHAR(50),

    -- Stripe
    stripe_checkout_session_id VARCHAR(255),
    paid_at TIMESTAMPTZ,

    -- GDPR
    agreement_accepted_at TIMESTAMPTZ,

    -- Unique constraint: prevent duplicate registrations for same FIDE ID + category
    CONSTRAINT unique_fide_category UNIQUE (fide_id, category)
);

-- Create indexes for common queries
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_category ON registrations(category);
CREATE INDEX idx_registrations_fide_id ON registrations(fide_id);
CREATE INDEX idx_registrations_email ON registrations(email);
CREATE INDEX idx_registrations_created_at ON registrations(created_at DESC);

-- Row Level Security (RLS) - Optional but recommended
-- For now, we use service_role key which bypasses RLS
-- If you want to enable RLS for the anon key, uncomment below:

-- ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (this is default behavior)
-- CREATE POLICY "Service role has full access" ON registrations
--     FOR ALL USING (auth.role() = 'service_role');

-- View for admin dashboard
CREATE VIEW registration_stats AS
SELECT
    category,
    status,
    COUNT(*) as count,
    SUM(CASE WHEN is_free_entry THEN 0 ELSE amount_ron END) / 100 as total_revenue_ron
FROM registrations
GROUP BY category, status
ORDER BY category, status;

-- Useful queries for admin:

-- All paid registrations
-- SELECT * FROM registrations WHERE status = 'paid' ORDER BY created_at DESC;

-- Revenue by category
-- SELECT category, SUM(amount_ron)/100 as revenue_ron, COUNT(*) as participants
-- FROM registrations WHERE status = 'paid' GROUP BY category;

-- Pending payments (to follow up)
-- SELECT full_name, email, category, created_at
-- FROM registrations WHERE status = 'pending' AND created_at < NOW() - INTERVAL '1 hour';
