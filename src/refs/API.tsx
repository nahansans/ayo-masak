export const BaseUrl = "https://masak-apa.tomorisakura.vercel.app/api"

type refsType = {
    params?: any,
    callback: {
        onSuccess: (data: any) => void,
        onFailed: (data: any) => void
    }
}

export const makeRequest = async(url: string, refs: refsType) => {
    await fetch(`${BaseUrl}${url}`)
    .then(res => res.json())
    .then(resJson => {
        if (resJson != null) {
            if (resJson.status == true || resJson.status != undefined) {
                refs.callback.onSuccess(resJson)
            } else {
                refs.callback.onFailed({status: resJson.status || resJson.status, resJson})
            }
        } else {
            refs.callback.onFailed({status: resJson, resJson})
        }
    })
}

export const API = {
    Recipes: (
        refs = {
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        "/recipes",
        refs
    ),
    RecipesByPage: (        
        refs = {
            params: {page: 1},
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/recipes/${refs.params.page}`,
        refs
    ),
    RecipeDetail: (        
        refs = {
            params: {key: ``},
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/recipe/${refs.params.key}`,
        refs
    ),
    CategoryRecipes: (        
        refs = {
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/categorys/recipes`,
        refs
    ),
    CategoryRecipeDetail: (        
        refs = {
            params: {key: ``},
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/categorys/recipes/${refs.params.key}`,
        refs
    ),
    Search: (        
        refs = {
            params: {key: ``},
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/search/?q=${refs.params.key}`,
        refs
    ),
    ArticleCategory: (        
        refs = {
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/categorys/article`,
        refs
    ),
    ArticleCategoryDetail: (        
        refs = {
            params: {key: ``},
            callback: {onSuccess: (resJson: any) => {}, onFailed: (results: any) => {}}
        }
    ) => makeRequest(
        `/categorys/article/${refs.params.key}`,
        refs
    ),
}