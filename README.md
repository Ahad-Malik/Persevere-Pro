# Persevere Pro

**Persevere Pro** is a collaborative platform designed to enhance teamwork and optimize performance tracking for athletes, Work teams, and fitness enthusiasts. The platform enables users to manage tasks, track team progress, and foster an environment of accountability, ensuring that everyone on the team stays on top of their goals.

## Features

- **Dashboard Interface**: Get a complete overview of tasks, team members, and deadlines.
- **Task Management**: Assign and track tasks, with progress tracking for each member.
- **Leaderboard**: A competitive ranking system for teams based on their performance and task completion.
- **Calendar Integration**: View important dates, upcoming tasks, goals and Team Gallery on a shared calendar.
- **Team Collaboration**: Foster teamwork by assigning tasks and monitoring team progress in real-time.
- **Performance Insights**: Track and visualize performance metrics for personal and team goals.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL

## Installation

To get started with Persevere Pro on your local machine, follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/Ahad-Malik/Persevere-Pro.git
   cd Persevere-Pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```

4. Add your environment variables (replace with your actual values):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` in your browser to use Persevere Pro.

## Usage

Once installed, you can use Persevere Pro to:
- **Create Teams**: Invite members and assign roles.
- **Manage Tasks**: Add new tasks, assign them to team members, and monitor progress.
- **Complete & Upload**: Media-based Progress Tracking.
- **Leaderboard**: View team rankings based on task completion and performance.
- **Track Performance**: Review individual and team performance metrics over time.
- **Collaborate**: Foster real-time collaboration with your team.
- **Random Acts of Fitness**: Surprise pop-up challenges throughout the day, quick, fun exercises to boost activity levels (e.g., "Do 10 jumping jacks now!"),  and earn bonus points for completing these spontaneous challenges to get ahead of your teammates on the leaderboard!

## Contributing

Contributions are welcome! If you'd like to contribute to Persevere Pro, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
