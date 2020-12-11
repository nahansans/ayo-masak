export type NavigationType = {
    SplashScreen: undefined,
    BottomTab: undefined,
    Home: undefined,
    Walkthrough: undefined,
    Search: undefined,
    Favorite: undefined,
    RecipesDetail: {
        key: any,
        thumb?: string
    },
    RecipeStep: {
        steps?: any,
        currentStepIndex?: any,
        key?: any,
        thumb?: string
    }
}