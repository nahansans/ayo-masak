export type NavigationType = {
    SplashScreen: undefined,
    Home: undefined,
    Walkthrough: undefined,
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