/* eslint-disable no-duplicate-case */
import * as toodActions from "./actionTypes";

const initState = {
    todo: [],
    isLoading: false,
    isError: false,
    theme: [
        "https://img.freepik.com/free-photo/carbon-fiber-background_103577-827.jpg?size=626&ext=jpg",
        "https://c4.wallpaperflare.com/wallpaper/381/706/349/i-m-not-doing-shit-today-hd-wallpaper-thumb.jpg",
        "http://www.powerhomepages.com/themes/textures/hive.jpg",
        "https://thumbs.dreamstime.com/b/yellow-tech-beehive-d-render-consists-many-hexagonal-shapes-black-reflective-plates-some-elevated-60120587.jpg",
        "https://c4.wallpaperflare.com/wallpaper/177/767/797/simple-background-texture-pattern-wallpaper-thumb.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWJI_iwbIdq5niducnpgCE-E_1J5TNEeSO_A&usqp=CAU",
        "https://st2.depositphotos.com/5725180/10154/i/950/depositphotos_101543800-stock-photo-abstract-metal-bee-hive-background.jpg",
        "https://i.pinimg.com/originals/e2/1c/05/e21c05b7a2be29629629e0b315786042.jpg",
        "https://c1.wallpaperflare.com/preview/767/117/174/background-computer-screen-wallpaper-desktop.jpg"
    ],
    newTheme: ''
};

const reducer = (state = initState, { type, data, link }) => {
    switch (type) {
// Get Data
        case toodActions.GET_TODO_REQUEST:
            return {
                ...state,
                isError: false,
                isLoading: true
            };
        case toodActions.GET_TODO_SUCCESS:
            return {
                ...state,
                todo: data,
                isError: false,
                isLoading: false
            }
        case toodActions.GET_TODO_FAILURE: {
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        }
        
// Post Data           
        case toodActions.GET_TODO_REQUEST:
            return {
                ...state,
                isError: false,
                isLoading: true
            };
        case toodActions.GET_TODO_SUCCESS:
            return {
                ...state,
                todo: data,
                isError: false,
                isLoading: false
            }
        case toodActions.GET_TODO_FAILURE: {
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        }
            
        case toodActions.CHANGE_THEME: {
            return {
                ...state,
                newTheme: link
            }
        }
        default:
            return state;
    }
}

 

export { reducer };
