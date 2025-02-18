import objectToStyle from '../object-to-style';
import Options from './Options';
import { StyleOptions } from './StyleOptions';

const getStyles = (options?: Options): Record<string, string> => {
  const styleOptions: StyleOptions = options || {};

  return {
    title: objectToStyle({
      fontWeight: 'bold',
      ...styleOptions.titleStyle,
    }),
    form: objectToStyle({
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #ccc',
      padding: 16,
      borderRadius: 4,
      maxWidth: 360,
      ...styleOptions.formStyle,
    }),
    button: objectToStyle({
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      ...styleOptions.submitStyle,
    }),
    comment: objectToStyle({
      width: '100%',
      marginTop: 12,
      padding: 8,
      border: '1px solid #ccc',
      borderRadius: 4,
      boxSizing: 'border-box',
      outline: 'none',
      resize: 'vertical',
      ...styleOptions.commentStyle,
    }),
    starWrapper: objectToStyle({
      display: 'flex',
      gap: 8,
      cursor: 'pointer',
      ...styleOptions.starWrapperStyle,
    }),
    star: objectToStyle({
      cursor: 'pointer',
      fontSize: 24,
      color: '#ff7800',
      ...styleOptions.starStyle,
    }),
    buttonWrapper: objectToStyle({
      marginTop: 8,
      flexDirection: 'row-reverse',
      display: 'flex',
      ...styleOptions.buttonWrapperStyle,
    }),
    cancel: objectToStyle({
      color: '#ff0000',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      backgroundColor: 'transparent',
      ...styleOptions.cancelStyle,
    }),
  };
};

export default getStyles;
