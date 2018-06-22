// Setup tests
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import fontawesome from "@fortawesome/fontawesome";
import faSearch from "@fortawesome/fontawesome-free-solid/faSearch";
import faCaretDown from "@fortawesome/fontawesome-free-solid/faCaretDown";

fontawesome.library.add(faSearch, faCaretDown);

configure({ adapter: new Adapter() });