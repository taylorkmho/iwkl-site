import controller from '@squarespace/controller';
import { Masthead } from './components/MastHead';
import { GrantMap } from './components/GrantMap';
import { GrantModal } from './components/GrantModal';
import { HomeVideoPlayer } from './components/home-player-video';
import { TopBarMenu } from './components/top-bar';

new TopBarMenu;
new GrantMap;
new GrantModal;

controller.register('HomeVideoPlayer', HomeVideoPlayer);
controller.register('Masthead', Masthead);
