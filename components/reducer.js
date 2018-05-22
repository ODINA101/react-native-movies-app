
const initialState = {
    title:"მთავარი",
    menu:true,
    nav:"",
    page:"მთავარი",
    pageid:'',
   drawerlock:"unlocked",
   fullOpened:false,
   openDrawer:"",
   fetching:true,
   database:[],
   databaseNum:0,
   openuri:'',
   searching:false,
   searchTxt:''


}



export default  (state=initialState,action) => {


    switch(action.type) {
        case "pageid":
        state.pageid = action.payload;
        return state;
        break;
        case "search": 
        state.searchTxt = action.payload
        return state;
        case "searching":
        state.searching = !state.searching
        return state;

        case "OpenUri": 
        state.openuri = action.payload
        return state;
        break;
        case "databaseNum":
        state.databaseNum = action.payload
        return state
        break;
       case "fetch": 
       state.fetching = action.payload
       return state;
      case "database":
      state.database = action.payload
      return state;
      break;
      case "SetOpenDrawer":
      state.openDrawer = action.payload
      return state;
        break;
        case "full":
        state.fullOpened = !state.fullOpened;
        return state;
        break;
        case "page":
        state.page = action.payload
        return state;
        break;
      case "setNav":
       state.nav = action.payload
       return state;
       case "drawerChangeMode":
         if(state.drawerlock !== "locked-closed") {
             state.drawerlock = "locked-closed"
         }else{
             state.drawerlock = "unlocked"
         }
       return state;
       break;

        default:
        return state;
    }



}
