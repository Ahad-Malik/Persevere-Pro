import Header from '@/components/layout/Header';
import LoginForm from './LoginForm';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen bg-black text-white relative overflow-hidden">
      <AnimatedBackground />
      <Header />
      <div className="flex-1 flex items-center justify-center relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}