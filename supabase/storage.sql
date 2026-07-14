-- Setup Storage Buckets untuk Website Desa
-- Menjalankan ini membutuhkan privileges yang tepat di Supabase SQL Editor

INSERT INTO storage.buckets (id, name, public) VALUES 
('officials', 'officials', true),
('news', 'news', true),
('umkm', 'umkm', true),
('website', 'website', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for public reading
CREATE POLICY "Public Access officials" ON storage.objects FOR SELECT USING (bucket_id = 'officials');
CREATE POLICY "Public Access news" ON storage.objects FOR SELECT USING (bucket_id = 'news');
CREATE POLICY "Public Access umkm" ON storage.objects FOR SELECT USING (bucket_id = 'umkm');
CREATE POLICY "Public Access website" ON storage.objects FOR SELECT USING (bucket_id = 'website');
