import {library} from '@fortawesome/fontawesome-svg-core';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {
  faAddressBook,
  faCheckSquare,
  faCoffee,
  faPlane,
} from '@fortawesome/free-solid-svg-icons';

export const configureIconLibrary = (): void => {
  library.add(fas, fab, faCheckSquare, faCoffee, faAddressBook, faPlane);
};
