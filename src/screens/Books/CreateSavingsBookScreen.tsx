import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Path, Circle} from 'react-native-svg';
import {colors, typography, spacing} from '../../theme';
import {BooksStackParamList} from '../../navigation/BooksNavigator';
import {DatePickerCalendar} from '../../components/DatePickerCalendar';

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

const SavingsIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="10"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="2"
    />
    <Path
      d="M12 6V12M12 12L15 15"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.5 8.5C9 8 10 7.5 12 7.5C14.5 7.5 15 9 15 10C15 11.5 13.5 12 12 12C10.5 12 9 12.5 9 14C9 15 10 16.5 12 16.5C14 16.5 15 16 15.5 15.5"
      stroke={colors.secondary.darkBlueGray}
      strokeWidth="1.5"
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

const UserIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
      stroke={colors.text.primary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SettingsIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z"
      stroke={colors.text.secondary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckCircleFilledIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill={colors.primary.pink} />
    <Path
      d="M9 12L11 14L15 10"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CircleIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle
      cx="12"
      cy="12"
      r="9"
      stroke={colors.neutral.gray300}
      strokeWidth="2"
    />
  </Svg>
);

const RupeeIcon = () => (
  <Svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 3H18M6 8H18M14 3C14 5.20914 12.2091 7 10 7H6L14 21M10 7C12.2091 7 14 8.79086 14 11H6"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = ({rotation}: {rotation: Animated.Value}) => {
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);

  return (
    <AnimatedSvg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      style={{
        transform: [{
          rotate: rotation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg'],
          }),
        }],
      }}>
      <Path
        d="M6 9L12 15L18 9"
        stroke={colors.text.secondary}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </AnimatedSvg>
  );
};

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  avatarImage: any;
}

// Initial recent contacts
const initialContacts: Contact[] = [
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

type CreateSavingsBookScreenNavigationProp = StackNavigationProp<BooksStackParamList, 'CreateSavingsBook'>;

interface CreateSavingsBookScreenProps {
  navigation: CreateSavingsBookScreenNavigationProp;
}

export const CreateSavingsBookScreen: React.FC<CreateSavingsBookScreenProps> = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [goalName, setGoalName] = useState('');
  const [savingsType, setSavingsType] = useState<'purchase' | 'bigPurchase' | 'vacation' | 'emergency' | 'education' | 'wedding' | 'baby' | 'investment' | 'general'>('purchase');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [currency, setCurrency] = useState('INR - Indian Rupee');
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [recentContacts, setRecentContacts] = useState<Contact[]>(initialContacts);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const [splitOption, setSplitOption] = useState<'equal' | 'later' | 'by-person' | 'custom-amount' | 'percentage'>('equal');
  const [selectedSplitPersons, setSelectedSplitPersons] = useState<string[]>([]);
  const [customAmounts, setCustomAmounts] = useState<{[key: string]: string}>({});
  const [percentages, setPercentages] = useState<{[key: string]: string}>({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  // Animation values for accordion
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const animatedRotation = useRef(new Animated.Value(0)).current;

  // Sticky header animation
  const scrollY = useRef(0);
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const stickyHeaderThreshold = 100; // When header becomes sticky
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(animatedHeight, {
        toValue: isSettingsExpanded ? 1 : 0,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }),
      Animated.spring(animatedRotation, {
        toValue: isSettingsExpanded ? 1 : 0,
        useNativeDriver: false,
        tension: 80,
        friction: 12,
      }),
    ]).start();
  }, [isSettingsExpanded]);

  const handleAddContact = (contactId: string) => {
    if (!selectedContacts.includes(contactId)) {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleRemoveContact = (contactId: string) => {
    setSelectedContacts(selectedContacts.filter(id => id !== contactId));
  };

  const handleToggleSplitPerson = (contactId: string) => {
    if (selectedSplitPersons.includes(contactId)) {
      setSelectedSplitPersons(selectedSplitPersons.filter(id => id !== contactId));
    } else {
      setSelectedSplitPersons([...selectedSplitPersons, contactId]);
    }
  };

  const handleCustomAmountChange = (contactId: string, amount: string) => {
    setCustomAmounts({...customAmounts, [contactId]: amount});
  };

  const handlePercentageChange = (contactId: string, percentage: string) => {
    setPercentages({...percentages, [contactId]: percentage});
  };

  const handleInvite = () => {
    if (inviteName.trim() && phoneNumber.trim()) {
      // Generate new contact ID
      const newId = `invited-${Date.now()}`;

      // Get avatar based on name initial or use a random one
      const nameInitial = inviteName.trim()[0].toUpperCase();
      const randomAvatarIndex = Math.floor(Math.random() * avatarImages.length);

      // Create new contact
      const newContact: Contact = {
        id: newId,
        name: inviteName.trim(),
        phone: `+91 ${phoneNumber.trim()}`,
        avatar: nameInitial,
        avatarImage: avatarImages[randomAvatarIndex],
      };

      // Add to recent contacts
      setRecentContacts([...recentContacts, newContact]);

      // Add to selected contacts
      setSelectedContacts([...selectedContacts, newId]);

      // Clear the fields after invite
      setInviteName('');
      setPhoneNumber('');
    }
  };

  const handleDateConfirm = (date: Date) => {
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
    setTargetDate(formattedDate);
    setTempDate(date);
  };

  const handleCreateBook = () => {
    // TODO: Implement create book logic with splitOption
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;

    // Check if header has become sticky
    const shouldBeSticky = currentScrollY >= stickyHeaderThreshold;
    if (shouldBeSticky !== isHeaderSticky) {
      setIsHeaderSticky(shouldBeSticky);
      // Animate background when sticky state changes
      Animated.timing(headerOpacity, {
        toValue: shouldBeSticky ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }

    scrollY.current = currentScrollY;
  };

  const renderStickyHeader = () => {
    return (
      <View style={styles.stickyHeaderContainer}>
        <Animated.View style={[styles.stickyHeaderBackground, {opacity: headerOpacity}]} />
        <Animated.View
          style={[
            styles.stickyHeaderContent,
            {
              paddingTop: insets.top + spacing.lg,
              opacity: headerOpacity,
            }
          ]}
          pointerEvents={isHeaderSticky ? 'auto' : 'none'}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Create Savings Goal</Text>
          </View>
        </Animated.View>
      </View>
    );
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
        overScrollMode="never"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        stickyHeaderIndices={[1]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Create Savings Goal</Text>
            </View>
          </View>

          {/* Sticky Header */}
          {renderStickyHeader()}

          {/* Info Box */}
          <View style={styles.infoBox}>
            <SavingsIcon />
            <Text style={styles.infoText}>
              Save money together with friends or family for shared goals like vacations, gifts, or emergency funds.
            </Text>
          </View>

          {/* What are you saving for Section */}
          <View style={styles.section}>
            <Text style={styles.labelInline}>
              What are you saving for? <Text style={styles.requiredText}>*</Text>
            </Text>
            <TextInput
              style={styles.inputInline}
              placeholder="e.g., New Bike - Royal Enfield"
              placeholderTextColor={colors.text.tertiary}
              value={goalName}
              onChangeText={setGoalName}
            />
          </View>

          {/* Savings Type Section */}
          <View style={styles.section}>
            <Text style={styles.labelInline}>Savings Type</Text>
            <View style={styles.savingsTypeWrapper}>
              <View style={styles.savingsTypeContainer}>
              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('purchase')}
                activeOpacity={0.7}>
                {savingsType === 'purchase' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Purchase Goal (bike, laptop)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('bigPurchase')}
                activeOpacity={0.7}>
                {savingsType === 'bigPurchase' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Big Purchase (house, car)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('vacation')}
                activeOpacity={0.7}>
                {savingsType === 'vacation' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Vacation/Trip</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('emergency')}
                activeOpacity={0.7}>
                {savingsType === 'emergency' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Emergency Fund</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('education')}
                activeOpacity={0.7}>
                {savingsType === 'education' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Education</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('wedding')}
                activeOpacity={0.7}>
                {savingsType === 'wedding' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Wedding</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('baby')}
                activeOpacity={0.7}>
                {savingsType === 'baby' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Baby/Family</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('investment')}
                activeOpacity={0.7}>
                {savingsType === 'investment' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>Investment Fund</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.savingsTypeOption}
                onPress={() => setSavingsType('general')}
                activeOpacity={0.7}>
                {savingsType === 'general' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                <Text style={styles.savingsTypeText}>General Savings</Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Target Amount Section */}
          <View style={styles.section}>
            <Text style={styles.labelInline}>
              Target Amount <Text style={styles.requiredText}>*</Text>
            </Text>
            <View style={styles.amountInputWrapper}>
              <Text style={styles.currencySymbolLarge}>₹</Text>
              <TextInput
                style={styles.amountInputLarge}
                placeholder="50,000"
                placeholderTextColor={colors.text.tertiary}
                value={targetAmount}
                onChangeText={setTargetAmount}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Target Date Section */}
          <View style={styles.section}>
            <Text style={styles.labelInline}>Target Date (Optional)</Text>
            <TouchableOpacity
              style={styles.dateInputWrapper}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}>
              <Text style={[styles.dateInput, !targetDate && styles.dateInputPlaceholder]}>
                {targetDate || '06/30/2026'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>6 months from now</Text>

            {/* Suggested Monthly Saving */}
            <View style={styles.suggestionBox}>
              <View style={styles.suggestionContent}>
                <View>
                  <Text style={styles.suggestionLabel}>Suggested Monthly Saving:</Text>
                  <Text style={styles.suggestionAmount}>₹8,334/month</Text>
                  <Text style={styles.suggestionHelper}>to reach goal by June 2026</Text>
                </View>
                <TouchableOpacity style={styles.suggestionButton}>
                  <RupeeIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Who are you saving with Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Who are you saving with?</Text>

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

              <View style={styles.nameInputContainer}>
                <View style={styles.iconWrapper}>
                  <UserIcon />
                </View>
                <TextInput
                  style={styles.nameInput}
                  placeholder="Member Name"
                  placeholderTextColor={colors.text.tertiary}
                  value={inviteName}
                  onChangeText={setInviteName}
                />
              </View>

              <View style={styles.phoneInputContainer}>
                <View style={styles.countryCodeWrapper}>
                  <Text style={styles.countryCode}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="98765 43210"
                  placeholderTextColor={colors.text.tertiary}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>

              <TouchableOpacity
                style={styles.inviteButton}
                onPress={handleInvite}
                activeOpacity={0.8}>
                <Text style={styles.inviteButtonText}>Send Invite</Text>
              </TouchableOpacity>
            </View>

            {/* Advanced Settings */}
            <View style={styles.settingsSection}>
              <TouchableOpacity
                style={styles.settingsHeader}
                onPress={() => setIsSettingsExpanded(!isSettingsExpanded)}
                activeOpacity={0.7}>
                <SettingsIcon />
                <View style={styles.settingsTitleContainer}>
                  <Text style={styles.settingsTitle}>Advanced Settings </Text>
                  <Text style={styles.settingsOptional}>(Optional)</Text>
                </View>
                <ChevronDownIcon rotation={animatedRotation} />
              </TouchableOpacity>

              <Animated.View
                style={[
                  styles.settingsContentContainer,
                  {
                    maxHeight: animatedHeight.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 250],
                    }),
                    opacity: animatedHeight,
                  },
                ]}>
                <View style={styles.settingsContent}>
                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setSplitOption('equal')}
                    activeOpacity={0.7}>
                    {splitOption === 'equal' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                    <Text style={styles.radioLabel}>Split Equally</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setSplitOption('by-person')}
                    activeOpacity={0.7}>
                    {splitOption === 'by-person' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                    <Text style={styles.radioLabel}>By Person</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setSplitOption('custom-amount')}
                    activeOpacity={0.7}>
                    {splitOption === 'custom-amount' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                    <Text style={styles.radioLabel}>Custom Amount</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setSplitOption('percentage')}
                    activeOpacity={0.7}>
                    {splitOption === 'percentage' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                    <Text style={styles.radioLabel}>Percentage</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.radioOption}
                    onPress={() => setSplitOption('later')}
                    activeOpacity={0.7}>
                    {splitOption === 'later' ? <CheckCircleFilledIcon /> : <CircleIcon />}
                    <Text style={styles.radioLabel}>We will decide later</Text>
                  </TouchableOpacity>
                </View>
              </Animated.View>

              {/* By Person - Select People */}
              {isSettingsExpanded && splitOption === 'by-person' && (
                <View style={styles.byPersonContainer}>
                  <Text style={styles.byPersonLabel}>Select people to split with:</Text>
                  {selectedContacts.length > 0 ? (
                    recentContacts
                      .filter(contact => selectedContacts.includes(contact.id))
                      .map((contact) => (
                        <TouchableOpacity
                          key={contact.id}
                          style={styles.personCheckbox}
                          onPress={() => handleToggleSplitPerson(contact.id)}
                          activeOpacity={0.7}>
                          {selectedSplitPersons.includes(contact.id) ?
                            <CheckCircleFilledIcon /> : <CircleIcon />}
                          <Image
                            source={contact.avatarImage}
                            style={styles.personAvatar}
                            resizeMode="cover"
                          />
                          <Text style={styles.personName}>{contact.name}</Text>
                        </TouchableOpacity>
                      ))
                  ) : (
                    <Text style={styles.byPersonHint}>
                      Add members first to select people for split
                    </Text>
                  )}
                </View>
              )}

              {/* Custom Amount - Enter amounts for each person */}
              {isSettingsExpanded && splitOption === 'custom-amount' && (
                <View style={styles.byPersonContainer}>
                  <Text style={styles.byPersonLabel}>Enter amount for each person:</Text>
                  {selectedContacts.length > 0 ? (
                    recentContacts
                      .filter(contact => selectedContacts.includes(contact.id))
                      .map((contact) => (
                        <View key={contact.id} style={styles.amountInputRow}>
                          <Image
                            source={contact.avatarImage}
                            style={styles.personAvatar}
                            resizeMode="cover"
                          />
                          <Text style={styles.amountPersonName}>{contact.name}</Text>
                          <View style={styles.amountInputContainer}>
                            <Text style={styles.currencySymbol}>₹</Text>
                            <TextInput
                              style={styles.amountInput}
                              placeholder="0"
                              placeholderTextColor={colors.text.tertiary}
                              value={customAmounts[contact.id] || ''}
                              onChangeText={(text) => handleCustomAmountChange(contact.id, text)}
                              keyboardType="numeric"
                            />
                          </View>
                        </View>
                      ))
                  ) : (
                    <Text style={styles.byPersonHint}>
                      Add members first to set custom amounts
                    </Text>
                  )}
                </View>
              )}

              {/* Percentage - Enter percentage for each person */}
              {isSettingsExpanded && splitOption === 'percentage' && (
                <View style={styles.byPersonContainer}>
                  <Text style={styles.byPersonLabel}>Enter percentage for each person:</Text>
                  {selectedContacts.length > 0 ? (
                    recentContacts
                      .filter(contact => selectedContacts.includes(contact.id))
                      .map((contact) => (
                        <View key={contact.id} style={styles.amountInputRow}>
                          <Image
                            source={contact.avatarImage}
                            style={styles.personAvatar}
                            resizeMode="cover"
                          />
                          <Text style={styles.amountPersonName}>{contact.name}</Text>
                          <View style={styles.percentageInputContainer}>
                            <TextInput
                              style={styles.percentageInput}
                              placeholder="0"
                              placeholderTextColor={colors.text.tertiary}
                              value={percentages[contact.id] || ''}
                              onChangeText={(text) => handlePercentageChange(contact.id, text)}
                              keyboardType="numeric"
                            />
                            <Text style={styles.percentageSymbol}>%</Text>
                          </View>
                        </View>
                      ))
                  ) : (
                    <Text style={styles.byPersonHint}>
                      Add members first to set percentages
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
          {/* Create Book Button */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateBook}
              activeOpacity={0.8}>
              <Text style={styles.createButtonText}>Create Savings Goal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <DatePickerCalendar
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          onConfirm={handleDateConfirm}
          initialDate={tempDate}
          title="Select Target Date"
        />
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
  stickyHeaderContainer: {
    height: 0,
  },
  stickyHeaderBackground: {
    position: 'absolute',
    top: -spacing.xs,
    left: -500,
    right: -500,
    height: 130,
    backgroundColor: 'rgba(254, 249, 249, 0.95)',
  },
  stickyHeaderContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
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
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  requiredText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: '#FF5252',
  },
  optionalText: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  radioGroup: {
    gap: spacing.sm,
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
    gap: spacing.xs,
  },
  currencySymbolLarge: {
    fontSize: 19.2,
    fontFamily: typography.fonts.bold,
    color: colors.text.primary,
  },
  amountInputLarge: {
    flex: 1,
    fontSize: 19.2,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    padding: 0,
  },
  currencyDisplay: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  currencyText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
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
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.neutral.white,
    marginBottom: spacing.sm,
  },
  iconWrapper: {
    width: 30,
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  nameInput: {
    flex: 1,
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
    borderRadius: 8,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.neutral.white,
    marginBottom: spacing.sm,
  },
  countryCodeWrapper: {
    width: 30,
    marginRight: spacing.sm,
  },
  countryCode: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  phoneInput: {
    flex: 1,
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    paddingVertical: spacing.xs,
  },
  inviteButton: {
    backgroundColor: colors.primary.pink,
    borderRadius: 8,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  inviteButtonText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: 'white',
  },
  settingsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  settingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  settingsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsTitle: {
    fontSize: 12.8,
    fontFamily: typography.fonts.medium,
    color: colors.text.primary,
  },
  settingsOptional: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
  },
  settingsContentContainer: {
    overflow: 'hidden',
  },
  settingsContent: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 4,
  },
  radioLabel: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
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
  byPersonContainer: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  byPersonLabel: {
    fontSize: 11.2,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  byPersonHint: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: colors.text.secondary,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  personCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  personAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'white',
  },
  personName: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.xs,
  },
  amountPersonName: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    flex: 1,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    gap: 4,
    minWidth: 80,
  },
  currencySymbol: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  amountInput: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    padding: 0,
    minWidth: 40,
    textAlign: 'right',
  },
  percentageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    gap: 4,
    minWidth: 60,
  },
  percentageInput: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    padding: 0,
    minWidth: 30,
    textAlign: 'right',
  },
  percentageSymbol: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
  },
  labelInline: {
    fontSize: 12.8,
    fontFamily: typography.fonts.semibold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  inputInline: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  savingsTypeWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  savingsTypeContainer: {
    gap: spacing.sm,
  },
  savingsTypeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  savingsTypeText: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
  },
  dateInputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: `${colors.secondary.darkBlueGray}33`,
  },
  dateInput: {
    fontSize: 12.8,
    fontFamily: typography.fonts.regular,
    color: colors.text.primary,
    padding: 0,
  },
  dateInputPlaceholder: {
    color: colors.text.tertiary,
  },
  suggestionBox: {
    backgroundColor: colors.primary.pink,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  suggestionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  suggestionLabel: {
    fontSize: 14.4,
    fontFamily: typography.fonts.bold,
    color: 'white',
    marginBottom: spacing.xs,
  },
  suggestionAmount: {
    fontSize: 16,
    fontFamily: typography.fonts.bold,
    color: 'white',
    marginBottom: 2,
  },
  suggestionHelper: {
    fontSize: 11.2,
    fontFamily: typography.fonts.regular,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  suggestionButton: {
    width: 44.8,
    height: 44.8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3.2,
  },
});
