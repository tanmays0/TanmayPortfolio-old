/**
 * Profile portrait — scales the full headshot to fit the card (no face crop).
 */
import { useState } from 'react';
import {
  Image,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { PROFILE, PROFILE_IMAGE } from '../data/profile';

/** Native profile.jpg is 893×1024 */
const PHOTO_W = 893;
const PHOTO_H = 1024;
const PHOTO_ASPECT = PHOTO_W / PHOTO_H;
const INSET = 12;

type ProfilePhotoProps = {
  /** Caps how tall the photo block can get on the screen. */
  maxHeight?: number;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

export function ProfilePhoto({
  maxHeight = 380,
  style,
  accessibilityLabel = `Profile photo of ${PROFILE.name}`,
}: ProfilePhotoProps) {
  const [width, setWidth] = useState(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const next = Math.round(event.nativeEvent.layout.width);
    if (next > 0 && next !== width) {
      setWidth(next);
    }
  };

  const innerMaxW = width > 0 ? Math.max(0, width - INSET * 2) : 0;
  const innerMaxH = Math.max(0, maxHeight - INSET * 2);

  // Uniform scale so the full photo fits inside the available box.
  const scale =
    innerMaxW > 0
      ? Math.min(innerMaxW / PHOTO_W, innerMaxH / PHOTO_H)
      : 0;
  const imageWidth = Math.round(PHOTO_W * scale);
  const imageHeight = Math.round(PHOTO_H * scale);
  const frameHeight = imageHeight > 0 ? imageHeight + INSET * 2 : undefined;

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.frame,
        {
          height: frameHeight,
          padding: INSET,
          backgroundColor: '#D4D4D6',
        },
        style,
      ]}>
      {scale > 0 ? (
        <Image
          source={PROFILE_IMAGE}
          accessibilityLabel={accessibilityLabel}
          resizeMode="contain"
          style={{ width: imageWidth, height: imageHeight }}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
