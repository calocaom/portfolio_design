import {
  CAROUSEL_1,
  CAROUSEL_2,
  PROJECT_ART,
} from '../assets'
import { publicUrl } from '../utils/publicUrl'

export const PROJECT_IMAGES = {
  1: CAROUSEL_1,
  2: CAROUSEL_2,
  4: publicUrl('portfolios/mua/06.png'),
  5: PROJECT_ART,
}

/** External URLs opened in a new tab when a project row / hex is clicked */
export const PROJECT_LINKS = {
  5: 'https://omarcaloca.com',
}

/** Internal app screens opened when a project row / hex is clicked */
export const PROJECT_ROUTES = {
  1: 'digital-solutions',
  2: 'ux-ui',
  4: 'makeup-fx',
}

export const PROJECT_IDS = [1, 2, 4, 5]
