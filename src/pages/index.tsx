import { LoginButton, Header } from "@/styles/pages/app";

export default function Home() {
  return (
    <Header>
      <h1>BORA JOGAR</h1>
      <div>
        <a>Organize</a>
        <a>Jogue</a>
        <a>Conecte-se</a>
      </div>
      <LoginButton href="/login">Login</LoginButton>
    </Header>
  );
}
