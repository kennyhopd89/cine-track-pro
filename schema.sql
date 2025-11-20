-- Projects Table
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  director text,
  poster text,
  status text,
  code text,
  vfx_stats jsonb,
  created_at timestamptz default now()
);

-- Assets Table
create table assets (
  id uuid default gen_random_uuid() primary key,
  pid uuid references projects(id) on delete cascade,
  name text,
  type text,
  dept text,
  ver text,
  status text,
  link text,
  notes text,
  scope text,
  created_at timestamptz default now()
);

-- Festivals Table
create table festivals (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  location text,
  tier text,
  deadline date,
  contact_email text,
  created_at timestamptz default now()
);

-- Submissions Table
create table submissions (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references projects(id) on delete cascade,
  festival_id uuid references festivals(id) on delete cascade,
  status text,
  submission_date timestamptz,
  screener_link text,
  screener_pass text,
  dcp_version text,
  tracking_number text,
  created_at timestamptz default now()
);

-- Insert some initial festivals
insert into festivals (name, location, tier, deadline, contact_email) values
('Cannes Film Festival', 'France', 'A-List', '2025-03-01', 'submissions@festival-cannes.com'),
('Sundance Film Festival', 'USA', 'A-List', '2025-09-15', 'programming@sundance.org'),
('Busan International Film Festival', 'South Korea', 'A-List', '2025-07-20', 'program@biff.kr'),
('Clermont-Ferrand', 'France', 'Shorts', '2025-10-05', 'selection@clermont-filmfest.org');
