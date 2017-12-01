import controller from '@squarespace/controller';
import { HomeVideoPlayer } from './components/home-player-video';
import { BlogHeader } from './components/blog-header';
import { TopBarMenu } from './components/top-bar';

let topBarMenu = new TopBarMenu;

controller.register('HomeVideoPlayer', HomeVideoPlayer);
controller.register('BlogHeader', BlogHeader);
