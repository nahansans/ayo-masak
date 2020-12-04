import { Platform } from 'react-native'

export const Fonts = {
    Lato: {
        Regular: Platform.OS == 'ios' ? 'Lato-Regular' : 'LatoRegular',
        Thin: Platform.OS == 'ios' ? 'Lato-Thin' : 'LatoThin',
        ThinItalic: Platform.OS == 'ios' ? 'Lato-ThinItalic' : 'LatoThinItalic',
        Light: Platform.OS == 'ios' ? 'Lato-Light' : 'LatoLight',
        LightItalic: Platform.OS == 'ios' ? 'Lato-LightItalic' : 'LatoLightItalic',
        Bold: Platform.OS == 'ios' ? 'Lato-Bold' : 'LatoBold',
        BoldItalic: Platform.OS == 'ios' ? 'Lato-BoldItalic' : 'LatoBoldItalic',
        Black: Platform.OS == 'ios' ? 'Lato-Black' : 'LatoBlack',
        BlackItalic: Platform.OS == 'ios' ? 'Lato-BlackItalic' : 'LatoBlackItalic',
    },
    Montserrat: {
        Regular: Platform.OS == 'ios' ? 'Montserrat-Regular' : 'MontserratRegular',
        SemiBold: Platform.OS == 'ios' ? 'Montserrat-SemiBold' : 'MontserratSemiBold',
        Bold: Platform.OS == 'ios' ? 'Montserrat-Bold' : 'MontserratBold',
        Black: Platform.OS == 'ios' ? 'Montserrat-Black' : 'MontserratBlack',
        ExtraBold: Platform.OS == 'ios' ? 'Montserrat-ExtraBold' : 'MontserratExtraBold',
    },
    OpenSans: {
        Regular: Platform.OS == 'ios' ? 'OpenSans-Regular' : 'OpenSansRegular',
        SemiBold: Platform.OS == 'ios' ? 'OpenSans-SemiBold' : 'OpenSansSemiBold',
        Bold: Platform.OS == 'ios' ? 'OpenSans-Bold' : 'OpenSansBold',
    }
}