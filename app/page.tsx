import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/teams');
  return null;
}
