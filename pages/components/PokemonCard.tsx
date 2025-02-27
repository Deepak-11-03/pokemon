// components/PokemonCard.tsx
import Link from "next/link";

interface PokemonCardProps {
  name: string;
  url: string;
}

export default function PokemonCard({ name, url }: PokemonCardProps) {
  const pokemonId = url?.split("/")?.slice(-2, -1)[0];

  return (
    <Link href={`/pokemon/${pokemonId}`} passHref>
      <div className="p-3  rounded-lg text-center shadow hover:shadow-md transition-shadow bg-white">
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={name}
          className="mx-auto w-20 h-20"
        />
        <p className="mt-2 font-bold capitalize">{name}</p>
      </div>
    </Link>
  );
}
