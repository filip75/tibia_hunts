import {createCacheReducer} from "../model/cache";
import {ADD_CHARACTER} from "../actions/characters";

const characterList = createCacheReducer(ADD_CHARACTER);

export default characterList;