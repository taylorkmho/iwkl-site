import controller from '@squarespace/controller';
import { HomeVideoPlayer } from './components/home-player-video';
import { Header } from './components/header';

controller.register('HomeVideoPlayer', HomeVideoPlayer);
controller.register('Header', Header);
