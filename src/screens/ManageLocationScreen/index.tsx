import { useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { BlurView } from '@react-native-community/blur';

import { cities } from './utils/cities';

import { City } from './components/City';

import { colors } from '@utils/colors';
import { commonValues } from '@utils/commonValues';
import {
  getFromStorage,
  removeFromStorage,
  saveToStorage,
} from '@utils/storageService';
import { STORAGE_KEYS } from '@utils/storageService/storageKeys';
import { WeatherDataProps } from '@utils/types';

import { CloseIcon } from '@assets/images/svg/CloseIcon';

import { styles } from './styles';

type ListItem = {
  item: string;
};

export const ManageLocationScreen = () => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [multiSelectFocused, setMultiSelectFocused] = useState(false);

  const derivedOpacity = useDerivedValue(() => {
    return withTiming(multiSelectFocused ? 0 : 1, { duration: 100 });
  });

  const opacityAnimated = useAnimatedStyle(() => {
    return {
      opacity: derivedOpacity.value,
    };
  });

  const multiSelectOnFocus = () => setMultiSelectFocused(true);
  const multiSelectOnBlur = () => setMultiSelectFocused(false);

  const keyExtractor = (item: string) => item;

  const onChange = async (value: string[]) => {
    await saveToStorage(STORAGE_KEYS.CITIES_LIST, value);

    setSelectedCities(value);
  };

  const handleDelete = async (city: string) => {
    const getStorageWeather = await getFromStorage<WeatherDataProps>(
      STORAGE_KEYS.SELECTED_CITY_WEATHER,
    );

    if (city === getStorageWeather?.name) {
      removeFromStorage(STORAGE_KEYS.SELECTED_CITY_WEATHER);
    }

    setSelectedCities(prevItems => {
      const newData = prevItems.filter(item => item !== city);
      onChange(newData);

      return newData;
    });
  };

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const renderRightActions = (
    prog: SharedValue<number>,
    drag: SharedValue<number>,
    city: string,
  ) => {
    const styleAnimation = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: drag.value + 50 }],
      };
    });

    return (
      <Reanimated.View style={[styles.deleteBtn, styleAnimation]}>
        <Pressable onPress={() => handleDelete(city)}>
          <CloseIcon />
        </Pressable>
      </Reanimated.View>
    );
  };

  const renderItem = useCallback(
    ({ item }: ListItem) => (
      <ReanimatedSwipeable
        containerStyle={styles.swipeableContainer}
        renderRightActions={(prog, drag) =>
          renderRightActions(prog, drag, item)
        }
      >
        <City
          array={selectedCities}
          item={item}
          setSelectedCities={setSelectedCities}
        />
      </ReanimatedSwipeable>
    ),
    [selectedCities],
  );

  useEffect(() => {
    const getCitiesList = async () => {
      const list = await getFromStorage<string[]>(STORAGE_KEYS.CITIES_LIST);

      setSelectedCities(list || []);
    };

    getCitiesList();
  }, []);

  return (
    <View style={styles.container}>
      <BlurView
        blurAmount={commonValues.SIZE_20}
        blurType="dark"
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
        onBlur={multiSelectOnBlur}
        onChange={onChange}
        onFocus={multiSelectOnFocus}
      />

      <Reanimated.View style={[styles.flatListWrap, opacityAnimated]}>
        <FlatList
          data={selectedCities}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          style={styles.flatListStyle}
        />
      </Reanimated.View>
    </View>
  );
};
