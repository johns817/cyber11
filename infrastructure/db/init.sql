-- CyberQuest Database Initialization
-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');
CREATE TYPE lab_difficulty AS ENUM ('easy', 'medium', 'hard', 'insane');
CREATE TYPE lab_os AS ENUM ('linux', 'windows', 'cloud');
CREATE TYPE lab_status AS ENUM ('active', 'retired', 'unreleased');
CREATE TYPE challenge_difficulty AS ENUM ('easy', 'medium', 'hard', 'insane');
CREATE TYPE challenge_category AS ENUM ('web', 'crypto', 'forensics', 'reverse', 'pwn', 'misc', 'osint', 'steganography');
CREATE TYPE achievement_rarity AS ENUM ('common', 'rare', 'epic', 'legendary');
CREATE TYPE path_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE subscription_tier AS ENUM ('free', 'premium', 'enterprise');

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    avatar VARCHAR(500),
    banner VARCHAR(500),
    bio TEXT,
    location VARCHAR(100),
    website VARCHAR(255),
    github_url VARCHAR(255),
    role user_role DEFAULT 'user',
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    reputation INTEGER DEFAULT 0,
    streak INTEGER DEFAULT 0,
    last_active_date TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    country VARCHAR(5),
    subscription_tier subscription_tier DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Labs table
CREATE TABLE IF NOT EXISTS labs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    difficulty lab_difficulty NOT NULL,
    os lab_os NOT NULL,
    status lab_status DEFAULT 'active',
    points INTEGER DEFAULT 0,
    tags TEXT[],
    docker_image VARCHAR(255),
    vpn_config TEXT,
    user_flag_hash VARCHAR(255),
    root_flag_hash VARCHAR(255),
    total_completions INTEGER DEFAULT 0,
    rating FLOAT DEFAULT 0,
    rating_count INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    max_duration_minutes INTEGER DEFAULT 120,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category challenge_category NOT NULL,
    difficulty challenge_difficulty NOT NULL,
    points INTEGER DEFAULT 0,
    flag_hash VARCHAR(255) NOT NULL,
    dynamic_flag BOOLEAN DEFAULT FALSE,
    hints TEXT[],
    tags TEXT[],
    solves INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    author VARCHAR(100),
    attachment_url VARCHAR(500),
    is_premium BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    tag VARCHAR(10) UNIQUE NOT NULL,
    description TEXT,
    avatar VARCHAR(500),
    banner VARCHAR(500),
    points INTEGER DEFAULT 0,
    region VARCHAR(20),
    max_members INTEGER DEFAULT 20,
    is_verified BOOLEAN DEFAULT FALSE,
    captain_id UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members junction table
CREATE TABLE IF NOT EXISTS team_members (
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    rarity achievement_rarity NOT NULL,
    xp_reward INTEGER DEFAULT 0,
    condition TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- Learning paths
CREATE TABLE IF NOT EXISTS learning_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100),
    level path_level NOT NULL,
    total_modules INTEGER DEFAULT 0,
    estimated_hours INTEGER DEFAULT 0,
    enrolled_count INTEGER DEFAULT 0,
    is_premium BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning modules
CREATE TABLE IF NOT EXISTS learning_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    sort_order INTEGER DEFAULT 0,
    xp_reward INTEGER DEFAULT 0,
    estimated_minutes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_path_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
    completed_modules INTEGER DEFAULT 0,
    progress_percent INTEGER DEFAULT 0,
    last_module_id UUID,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, path_id)
);

-- Lab instances (active user sessions)
CREATE TABLE IF NOT EXISTS lab_instances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    container_id VARCHAR(255),
    ip_address VARCHAR(45),
    status VARCHAR(20) DEFAULT 'running',
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Challenge submissions
CREATE TABLE IF NOT EXISTS challenge_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    flag_submitted VARCHAR(255) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forum posts
CREATE TABLE IF NOT EXISTS forum_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    is_pinned BOOLEAN DEFAULT FALSE,
    likes INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Forum comments
CREATE TABLE IF NOT EXISTS forum_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES forum_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tier subscription_tier NOT NULL,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    current_period_start TIMESTAMP,
    current_period_end TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit log
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id UUID,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_xp ON users(xp DESC);
CREATE INDEX idx_users_country ON users(country);
CREATE INDEX idx_labs_difficulty ON labs(difficulty);
CREATE INDEX idx_labs_os ON labs(os);
CREATE INDEX idx_labs_status ON labs(status);
CREATE INDEX idx_challenges_category ON challenges(category);
CREATE INDEX idx_challenges_difficulty ON challenges(difficulty);
CREATE INDEX idx_teams_points ON teams(points DESC);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_lab_instances_user ON lab_instances(user_id, status);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id, created_at);
CREATE INDEX idx_forum_posts_category ON forum_posts(category, created_at DESC);

-- ============================================
-- Extended Tables (Rooms, Tasks, Certificates, Events, Hints)
-- ============================================

-- Enum types for new tables
CREATE TYPE room_type AS ENUM ('walkthrough', 'challenge', 'ctf', 'soc_simulator', 'pentest_simulator');
CREATE TYPE room_difficulty AS ENUM ('very_easy', 'easy', 'medium', 'hard', 'insane');
CREATE TYPE task_type AS ENUM ('question', 'flag', 'multiple_choice', 'file_upload', 'code_challenge');
CREATE TYPE event_type AS ENUM ('ctf', 'koth', 'team_battle', 'seasonal', 'soc_challenge');
CREATE TYPE event_status AS ENUM ('upcoming', 'registration', 'active', 'completed');
CREATE TYPE cert_status AS ENUM ('not_started', 'in_progress', 'passed', 'failed');

-- Rooms (self-contained labs)
CREATE TABLE IF NOT EXISTS rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    description TEXT,
    room_type room_type DEFAULT 'walkthrough',
    difficulty room_difficulty DEFAULT 'easy',
    estimated_duration INTEGER DEFAULT 60,
    author_id UUID REFERENCES users(id),
    thumbnail VARCHAR(500),
    is_premium BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT true,
    total_users INTEGER DEFAULT 0,
    total_completions INTEGER DEFAULT 0,
    xp_reward INTEGER DEFAULT 50,
    tags TEXT[] DEFAULT '{}',
    prerequisites UUID[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Room Tasks
CREATE TABLE IF NOT EXISTS room_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    task_order INTEGER NOT NULL,
    task_type task_type DEFAULT 'question',
    content TEXT,
    xp_reward INTEGER DEFAULT 10,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task Questions
CREATE TABLE IF NOT EXISTS task_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES room_tasks(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    answer_hash VARCHAR(255),
    is_case_sensitive BOOLEAN DEFAULT false,
    question_order INTEGER NOT NULL,
    points INTEGER DEFAULT 5
);

-- Hints
CREATE TABLE IF NOT EXISTS hints (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    task_id UUID NOT NULL REFERENCES room_tasks(id) ON DELETE CASCADE,
    hint_text TEXT NOT NULL,
    hint_order INTEGER NOT NULL,
    xp_penalty INTEGER DEFAULT 5,
    unlock_after_minutes INTEGER DEFAULT 0
);

-- User Room Progress
CREATE TABLE IF NOT EXISTS user_room_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
    percentage INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(user_id, room_id)
);

-- User Task Answers
CREATE TABLE IF NOT EXISTS user_task_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES task_questions(id) ON DELETE CASCADE,
    submitted_answer TEXT,
    is_correct BOOLEAN DEFAULT false,
    attempts INTEGER DEFAULT 0,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, question_id)
);

-- Certificates
CREATE TABLE IF NOT EXISTS certificates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    certification_code VARCHAR(20) NOT NULL,
    certification_name VARCHAR(100) NOT NULL,
    issue_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiry_date TIMESTAMP,
    verification_url VARCHAR(500),
    score INTEGER,
    pdf_url VARCHAR(500)
);

-- Certification Attempts
CREATE TABLE IF NOT EXISTS certification_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    certification_code VARCHAR(20) NOT NULL,
    status cert_status DEFAULT 'not_started',
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    score INTEGER,
    time_taken_minutes INTEGER
);

-- Events & Competitions
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_type event_type NOT NULL,
    status event_status DEFAULT 'upcoming',
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    max_participants INTEGER,
    registration_deadline TIMESTAMP,
    prize_description TEXT,
    rules TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Participants
CREATE TABLE IF NOT EXISTS event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    rank INTEGER,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (user_id IS NOT NULL OR team_id IS NOT NULL)
);

-- King of the Hill Games
CREATE TABLE IF NOT EXISTS koth_games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    machine_id UUID REFERENCES labs(id),
    difficulty lab_difficulty DEFAULT 'medium',
    max_players INTEGER DEFAULT 16,
    current_players INTEGER DEFAULT 0,
    target_score INTEGER DEFAULT 100,
    status VARCHAR(20) DEFAULT 'waiting',
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- KotH Scores
CREATE TABLE IF NOT EXISTS koth_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    game_id UUID NOT NULL REFERENCES koth_games(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER DEFAULT 0,
    king_time_seconds INTEGER DEFAULT 0,
    flags_captured INTEGER DEFAULT 0
);

-- Networks (persistent multi-machine labs)
CREATE TABLE IF NOT EXISTS networks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    difficulty lab_difficulty DEFAULT 'hard',
    machine_count INTEGER DEFAULT 4,
    is_premium BOOLEAN DEFAULT true,
    active_players INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Streaks (detailed tracking)
CREATE TABLE IF NOT EXISTS user_streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    streak_started_at DATE,
    UNIQUE(user_id)
);

-- Hints Used (track which hints users unlocked)
CREATE TABLE IF NOT EXISTS hints_used (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hint_id UUID NOT NULL REFERENCES hints(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, hint_id)
);

-- Indexes for new tables
CREATE INDEX idx_rooms_type ON rooms(room_type);
CREATE INDEX idx_rooms_difficulty ON rooms(difficulty);
CREATE INDEX idx_rooms_published ON rooms(is_published, created_at DESC);
CREATE INDEX idx_room_tasks_room ON room_tasks(room_id, task_order);
CREATE INDEX idx_task_questions_task ON task_questions(task_id, question_order);
CREATE INDEX idx_hints_task ON hints(task_id, hint_order);
CREATE INDEX idx_user_room_progress ON user_room_progress(user_id, room_id);
CREATE INDEX idx_certificates_user ON certificates(user_id);
CREATE INDEX idx_events_status ON events(status, start_date);
CREATE INDEX idx_event_participants_event ON event_participants(event_id, score DESC);
CREATE INDEX idx_koth_games_status ON koth_games(status);
CREATE INDEX idx_networks_difficulty ON networks(difficulty);
CREATE INDEX idx_user_streaks_user ON user_streaks(user_id);
