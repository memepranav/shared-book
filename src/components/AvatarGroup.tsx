import React from 'react';
import {View, Text, StyleSheet, Image, ImageSourcePropType} from 'react-native';
import {typography} from '../theme';

interface AvatarProps {
  color: string;
  initials?: string;
  size?: number;
  image?: ImageSourcePropType;
}

const Avatar: React.FC<AvatarProps> = ({color, initials, size = 36, image}) => (
  <View style={[styles.avatar, {
    width: size,
    height: size,
    backgroundColor: image ? 'transparent' : color,
    borderRadius: size / 2,
    borderWidth: 2,
    borderColor: 'white',
    overflow: 'hidden',
  }]}>
    {image ? (
      <Image source={image} style={{width: size, height: size}} resizeMode="cover" />
    ) : (
      initials && (
        <Text
          style={[
            styles.avatarText,
            {
              fontSize: size * 0.35,
              lineHeight: size * 0.35,
            }
          ]}>
          {initials}
        </Text>
      )
    )}
  </View>
);

interface Member {
  initials?: string;
  color: string;
  image?: ImageSourcePropType;
}

interface AvatarGroupProps {
  members: Member[];
  maxVisible?: number;
  size?: number;
  borderColor?: string;
  overlap?: number;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  members,
  maxVisible = 3,
  size = 36,
  borderColor = 'white',
  overlap = 10,
}) => {
  const visibleMembers = members.slice(0, maxVisible);
  const remainingCount = members.length - maxVisible;

  return (
    <View style={styles.avatarsContainer}>
      {visibleMembers.map((member, index) => (
        <View
          key={index}
          style={[
            styles.avatarWrapper,
            {
              borderColor,
              borderRadius: size / 2,
              marginLeft: index > 0 ? -overlap : 0,
            },
          ]}>
          <Avatar color={member.color} initials={member.initials} size={size} image={member.image} />
        </View>
      ))}
      {remainingCount > 0 && (
        <View
          style={[
            styles.avatarWrapper,
            {
              borderColor,
              borderRadius: size / 2,
              marginLeft: -overlap,
            },
          ]}>
          <Avatar color="#6B6D7A" initials={`+${remainingCount}`} size={size} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontFamily: typography.fonts.semibold,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
