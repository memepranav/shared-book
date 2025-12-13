import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path} from 'react-native-svg';
import {colors, typography, spacing} from '../../theme';
import {BooksStackParamList} from '../../navigation/BooksNavigator';

// Avatar images
const avatarImages = [
  require('../../assets/images/avatars/1.png'),
  require('../../assets/images/avatars/2.png'),
  require('../../assets/images/avatars/3.png'),
  require('../../assets/images/avatars/4.png'),
  require('../../assets/images/avatars/5.png'),
  require('../../assets/images/avatars/6.png'),
];

// Icons
const BackIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18L9 12L15 6"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PersonalBookIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SearchIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21L16.65 16.65"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 19.5304 19.7893 20.0391 19.4142 20.4142C19.0391 20.7893 18.5304 21 18 21C14.0993 20.763 10.4202 19.1065 7.65683 16.3432C4.8935 13.5798 3.23705 9.90074 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  avatarImage: any;
}

// Sample recent contacts
const recentContacts: Contact[] = [
  {
    id: '1',
    name: 'Rahul Kumar',
    phone: '+91 98765 43210',
    avatar: 'R',
    avatarImage: avatarImages[0],
  },
  {
    id: '2',
    name: 'Priya Sharma',
    phone: '+91 98765 43211',
    avatar: 'P',
    avatarImage: avatarImages[1],
  },
];

type CreatePersonalBookScreenNavigationProp = StackNavigationProp<BooksStackParamList, 'CreatePersonalBook'>;

interface CreatePersonalBookScreenProps {
  navigation: CreatePersonalBookScreenNavigationProp;
}

export const CreatePersonalBookScreen: React.FC<CreatePersonalBookScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [bookName, setBookName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleAddContact = (contactId: string) => {
    if (!selectedContacts.includes(contactId)) {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleRemoveContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter(id => id !== contactId));
  };

  const handleCreateBook = () => {
    console.log('Create book with:', {bookName, selectedContacts, phoneNumber});
    // TODO: Implement create book logic
  };

  return (
    <LinearGradient
      colors={[
        colors.gradients.home.start,
        colors.gradients.home.middle,
        colors.gradients.home.end,
      ]}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, {paddingTop: insets.top + spacing.lg}]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never">
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Personal Book</Text>
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <PersonalBookIcon />
            <Text style={styles.infoText}>
              Track expenses between two people effortlessly. Perfect for couples, roommates, or friends.
            </Text>
          </View>

          {/* Book Name Section */}
          <View style={styles.section}>
            <Text style={styles.label}>
              Book Name <Text style={styles.optionalText}>(Optional)</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., You & Rahul"
              placeholderTextColor={colors.text.tertiary}
              value={bookName}
              onChangeText={setBookName}
            />
            <Text style={styles.helperText}>
              Give your shared book a recognizable name.
            </Text>
          </View>

          {/* Who are you sharing with Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Who are you sharing with?</Text>

            {/* Search Input */}
            <View style={styles.searchContainer}>
              <SearchIcon />
              <TextInput
                style={styles.searchInput}
                placeholder="Search or add person"
                placeholderTextColor={colors.text.tertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Added Members - Avatar Group */}
            {selectedContacts.length > 0 && (
              <View style={styles.addedMembersContainer}>
                <Text style={styles.contactsHeader}>ADDED MEMBERS</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.avatarGroup}>
                  {recentContacts
                    .filter(contact => selectedContacts.includes(contact.id))
                    .map((contact) => (
                      <View key={contact.id} style={styles.avatarGroupItem}>
                        <Image
                          source={contact.avatarImage}
                          style={styles.avatarLarge}
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          style={styles.removeIconButton}
                          onPress={() => handleRemoveContact(contact.id)}>
                          <Text style={styles.removeIcon}>×</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                </ScrollView>
              </View>
            )}

            {/* Recent Contacts */}
            <View style={styles.contactsSection}>
              <Text style={styles.contactsHeader}>RECENT CONTACTS</Text>
              {recentContacts.map((contact) => (
                <View key={contact.id} style={styles.contactItem}>
                  <View style={styles.contactLeft}>
                    <Image
                      source={contact.avatarImage}
                      style={styles.avatar}
                      resizeMode="cover"
                    />
                    <View style={styles.contactInfo}>
                      <Text style={styles.contactName}>{contact.name}</Text>
                      <Text style={styles.contactPhone}>{contact.phone}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddContact(contact.id)}>
                    <Text style={styles.addButtonText}>
                      {selectedContacts.includes(contact.id) ? 'Added' : 'Add'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* Invite by Phone */}
            <View style={styles.inviteSection}>
              <View style={styles.inviteHeader}>
                <PhoneIcon />
                <Text style={styles.inviteTitle}>Invite by phone number</Text>
              </View>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.countryCode}>+91</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="98765 43210"
                  placeholderTextColor={colors.text.tertiary}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>
            </View>
          </View>
          {/* Create Book Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateBook}
              activeOpacity={0.8}>
              <Text style={styles.createButtonText}>Create Book</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  headerTitle: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    lineHeight: 32,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.xl,
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  infoText: {
    flex: 1,
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    lineHeight: 16,
  },
  section: {
    marginBottom: spacing.xl,
  },
  label: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  optionalText: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  helperText: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  sectionTitle: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    padding: 0,
  },
  contactsSection: {
    marginBottom: spacing.md,
  },
  contactsHeader: {
    fontSize: 9.6,
    fontFamily: typography.fonts.semibold,
    color: colors.text.secondary,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'white',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: 2,
  },
  contactPhone: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  addButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  addButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.primary.pink,
  },
  addedMembersContainer: {
    marginBottom: spacing.md,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  avatarGroupItem: {
    position: 'relative',
  },
  avatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'white',
  },
  removeIconButton: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  removeIcon: {
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    color: 'white',
    lineHeight: 16,
    textAlign: 'center',
  },
  inviteSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  inviteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  inviteTitle: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.neutral.white,
  },
  countryCode: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  phoneInput: {
    flex: 1,
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  footer: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  createButton: {
    backgroundColor: colors.secondary.darkBlueGray,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
    shadowColor: colors.neutral.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: colors.neutral.white,
  },
});
