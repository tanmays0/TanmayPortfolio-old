/**
 * Stack Navigator — Home, About, Skills, Projects, Contact (+ extras).
 * Custom MobileNavHeader on screens; native header hidden.
 */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AboutScreen } from '../screens/AboutScreen';
import { CertificationsScreen } from '../screens/CertificationsScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { ExperienceScreen } from '../screens/ExperienceScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProjectsScreen } from '../screens/ProjectsScreen';
import { ResumeScreen } from '../screens/ResumeScreen';
import { SkillsScreen } from '../screens/SkillsScreen';
import { useTheme } from '../theme/ThemeContext';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
      <Stack.Screen name="Skills" component={SkillsScreen} />
      <Stack.Screen name="Projects" component={ProjectsScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Experience" component={ExperienceScreen} />
      <Stack.Screen name="Certifications" component={CertificationsScreen} />
      <Stack.Screen name="Resume" component={ResumeScreen} />
    </Stack.Navigator>
  );
}
