"use client";
import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import Image from 'next/image';

// Define the game type
interface Game {
  id: number;
  name: string;
  scene: string;
  image: string;
}

// Game data
const games: Game[] = [
    { 
        id: 1, 
        name: "Kids Chaos", 
        scene: "https://prod.spline.design/s5VgRsBwm7mq-Wqm/scene.splinecode",
        image: "/p1.png",
    },
    { 
        id: 2, 
        name: "Truck Boy", 
        scene: "https://prod.spline.design/kq0Sk-NbtEC7Gdkc/scene.splinecode",
        image: "/p2.png"
    },
    { 
        id: 3, 
        name: "Vespa Girl", 
        scene: "https://prod.spline.design/Z-OhaEXZh6qsk8Do/scene.splinecode",
        image: "/p3.png"
    },
];

// Home page component
export default function Home() {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);
    
    // If a game is selected, render the game view
    if (selectedGame) {
        return <GameView game={selectedGame} onBack={() => setSelectedGame(null)} />;
    }
    
    return (
        <main className="w-screen h-screen pt-24 bg-black p-4">
            {/* Creative layout for 3 games */}
            <div className="max-w-6xl mx-auto h-[calc(100vh-120px)] relative">
                {/* Game 1 - Large left side */}
                <button 
                    onClick={() => setSelectedGame(games[0])}
                    className="absolute top-0 left-0 w-[60%] h-full bg-gray-800 hover:bg-gray-700
                             transition-colors rounded-lg overflow-hidden group"
                >
                    <Image
                        src={games[0].image}
                        alt={games[0].name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 " />
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-white text-2xl font-bold">{games[0].name}</h2>
                    </div>
                </button>
                
                {/* Game 2 - Top right */}
                <button 
                    onClick={() => setSelectedGame(games[1])}
                    className="absolute top-0 right-0 w-[38%] h-[48%] bg-gray-800 hover:bg-gray-700
                             transition-colors rounded-lg overflow-hidden group"
                >
                    <Image
                        src={games[1].image}
                        alt={games[1].name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 " />
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-white text-xl font-bold">{games[1].name}</h2>
                    </div>
                </button>
                
                {/* Game 3 - Bottom right */}
                <button 
                    onClick={() => setSelectedGame(games[2])}
                    className="absolute bottom-0 right-0 w-[38%] h-[48%] bg-gray-800 hover:bg-gray-700
                             transition-colors rounded-lg overflow-hidden group"
                >
                    <Image
                        src={games[2].image}
                        alt={games[2].name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 " />
                    <div className="absolute bottom-4 left-4">
                        <h2 className="text-white text-xl font-bold">{games[2].name}</h2>
                    </div>
                </button>
            </div>
        </main>
    );
}

// Game view component
interface GameViewProps {
    game: Game;
    onBack: () => void;
}

function GameView({ game, onBack }: GameViewProps) {
    const [isLoading, setIsLoading] = useState(true);
    
    return (
        <main className="w-screen h-screen relative bg-black">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
                    <div className="text-center">
                        <div className="text-white text-xl mb-4">LOADING...</div>
                        <div className="text-white/60 text-sm space-y-1">
                            <p>CLICK + DRAG - ROTATE</p>
                            <p>WASD - MOVE</p>
                            <p>↑↓ - CAMERA</p>
                        </div>
                    </div>
                </div>
            )}
            
            <Spline
                scene={game.scene}
                onLoad={() => setIsLoading(false)}
            />
            
            {/* Back button */}
            <button 
                onClick={onBack}
                className="absolute top-4 left-4 z-50 px-4 py-2 rounded
                         text-white bg-black/50 hover:bg-black/70
                         border border-white/20 transition-colors"
            >
                ← BACK
            </button>
        </main>
    );
}