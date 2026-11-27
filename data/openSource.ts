// Public repositories on github.com/marufmax shown on the homepage.
// Star counts are typed in by hand (as of Nov 2026); update them here.
const openSource = [
  {
    name: 'emoticon-php',
    description: 'Composer package for working with emoticons in PHP.',
    language: 'PHP',
    stars: 32,
  },
  {
    name: 'deja-vu',
    description: 'Redis Sentinel for Laravel: write to the master, read from replicas.',
    language: 'PHP',
    stars: 8,
  },
  {
    name: 'laravel-nuxt-ecommerce',
    description: 'E-commerce app with a Laravel API and a server-rendered Nuxt front end.',
    language: 'PHP',
    stars: 9,
  },
  {
    name: 'image-manipulation-service',
    description: 'Small image manipulation service built on Slim and Redis.',
    language: 'PHP',
    stars: 2,
  },
  {
    name: 'grpc-notebook',
    description: 'Notebook backend using gRPC, NestJS and TypeORM.',
    language: 'TypeScript',
    stars: 1,
  },
  {
    name: 'better-flight',
    description: 'The FlightPHP micro framework with batteries included.',
    language: 'PHP',
    stars: 1,
  },
].sort((a, b) => b.stars - a.stars)

export default openSource
