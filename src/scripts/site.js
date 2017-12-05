import controller from '@squarespace/controller';
import { Masthead } from './components/MastHead';
import { GrantMap } from './components/GrantMap';
import { HomeVideoPlayer } from './components/home-player-video';
import { TopBarMenu } from './components/top-bar';

let topBarMenu = new TopBarMenu;
let grantMap = new GrantMap;

controller.register('HomeVideoPlayer', HomeVideoPlayer);
controller.register('Masthead', Masthead);
