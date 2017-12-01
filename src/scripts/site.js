import controller from '@squarespace/controller';
import { Masthead } from './components/masthead';
import { GrantMap } from './components/grant-map';
import { HomeVideoPlayer } from './components/home-player-video';
import { TopBarMenu } from './components/top-bar';

let topBarMenu = new TopBarMenu;
let grantMap = new GrantMap;

controller.register('HomeVideoPlayer', HomeVideoPlayer);
controller.register('Masthead', Masthead);
