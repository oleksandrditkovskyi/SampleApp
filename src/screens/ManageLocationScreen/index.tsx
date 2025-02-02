import { useState } from 'react';
import { View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';

import { BlurView } from '@react-native-community/blur';

import { cities } from './utils/cities';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';

import { styles } from './styles';

export const ManageLocationScreen = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <BlurView
        blurAmount={commonValues.SIZE_20}
        blurType="light"
        reducedTransparencyFallbackColor="white"
        style={styles.glassEffect}
      />

      <MultiSelect
        activeColor={colors.WHITE_TRANSPARENT_40}
        containerStyle={styles.multiSelectContainerStyle}
        data={cities}
        fontFamily="Poppins-Regular"
        iconColor={colors.WHITE}
        itemTextStyle={styles.multiSelectItemTextStyle}
        labelField="label"
        maxSelect={20}
        placeholder={`Select City(${selectedCities.length})`}
        placeholderStyle={styles.multiSelectItemTextStyle}
        showsVerticalScrollIndicator={false}
        style={styles.multiSelectStyle}
        value={selectedCities}
        valueField="value"
        visibleSelectedItem={false}
        onChange={setSelectedCities}
      />
    </View>
  );
};
