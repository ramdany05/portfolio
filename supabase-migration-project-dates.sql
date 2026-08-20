-- Migration: Add start_date and end_date to projects table
-- Run this in your Supabase SQL Editor

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS start_date TEXT,
ADD COLUMN IF NOT EXISTS end_date TEXT;
