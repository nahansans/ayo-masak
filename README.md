# ayo-masak

### Known Library Issues
1. jika mengalami problems ```Could not find a declaration file for module 'react-native-tts'. 'ayo-masak/node_modules/react-native-tts/index.js' implicitly has an 'any' type.
  Try `npm install @types/react-native-tts` if it exists or add a new declaration (.d.ts) file containing `declare module 'react-native-tts';` ```
2. silahkan buat file ```index.d.ts``` di folder ```node_modules/react-native-tts/```
3. silahkan copy script di bawah ini di file index.d.ts
```
declare module 'react-native-tts' {
  type SupportedEventsT =
    | 'tts-start'
    | 'tts-finish'
    | 'tts-pause'
    | 'tts-resume'
    | 'tts-progress'
    | 'tts-cancel';

  export class ReactNativeTTS {
    /**
     * getInitStatus
     * Android only, stubbed for iOS
     */
    getInitStatus: () => Promise<boolean>;

    /**
     * requestInstallEngine
     * Android only, stubbed for iOS
     */
    requestInstallEngine: () => Promise<boolean>;

    /**
     * requestInstallData
     * Android only, stubbed for iOS
     */
    requestInstallData: () => Promise<boolean>;

    /**
     * setDucking
     */
    setDucking: (enabled: boolean) => Promise<'success'>;
    // setDucking(enabled) {
    //   return TextToSpeech.setDucking(enabled);
    // }

    /**
     * setDefaultEngine
     * Android only, stubbed for iOS
     */
    setDefaultEngine: (engineName: string) => Promise<boolean>;

    /**
     * setDefaultVoice
     */
    setDefaultVoice: (
      voiceId: string,
    ) => Promise<
      'success' | 'lang_country_available' | 'lang_country_var_available'
    >;

    /**
     * setDefaultRate
     */
    setDefaultRate: (rate: number, skipTransform: boolean) => Promise<null>;

    /**
     * setDefaultPitch
     */
    setDefaultPitch: (pitch: number) => Promise<null>;

    /**
     * setDefaultLanguage
     */
    setDefaultLanguage: (
      language: string,
    ) => Promise<
      'success' | 'lang_country_available' | 'lang_country_var_available'
    >;

    /**
     * setIgnoreSilentSwitch
     * iOS only, stubbed for Android
     */
    setIgnoreSilentSwitch: (
      ignoreSilentSwitch: 'ignore' | 'obey',
    ) => Promise<'success'>;

    /**
     * voices
     */
    voices: () => Promise<
      Array<{
        id: string;
        name: string; // ios only
        language: string;
        quality: number;
      }>
    >;

    /**
     * engines
     * Android only, stubbed for iOS
     */
    engines: () => Promise<
      Array<{
        name: string;
        label: string;
        default: boolean;
        icon: number;
      }>
    >;

    /**
     * speak
     */
    speak: (
      utterance: string,
      options?: Partial<{
        rate: number;
        voiceId: string;
        androidParams: Partial<{
          KEY_PARAM_PAN: number;
          KEY_PARAM_VOLUME: number;
          KEY_PARAM_STREAM: string;
        }>;
      }>,
    ) => Promise<string>;

    /**
     * resume
     */
    stop: (onWordBoundary?: boolean) => Promise<boolean>;

    /**
     * pause
     * iOS only, stubbed for Android
     */
    pause: (onWordBoundary?: boolean) => Promise<boolean>;

    /**
     * resume
     * iOS only, stubbed for Android
     */
    resume: () => Promise<boolean>;

    addEventListener: (type: SupportedEventsT, handler: () => void) => void;

    removeEventListener: (type: SupportedEventsT, handler: () => void) => void;
  }

  const tts: ReactNativeTTS;
  export default tts;
}
```
