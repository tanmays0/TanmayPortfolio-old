/**
 * Projects — FlatList + JSON fetch (Assignments 8–10). Featured visual weight.
 */
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingBottomNav } from '../components/FloatingBottomNav';
import { MobileNavHeader } from '../components/MobileNavHeader';
import { ProjectCard } from '../components/ProjectCard';
import { ScreenMeshBackground } from '../components/ScreenMeshBackground';
import { SiteFooter } from '../components/SiteFooter';
import { fetchProjects, PROJECTS } from '../data/projectCatalog';
import type { Project } from '../types';
import { useTheme } from '../theme/ThemeContext';

const INITIAL_PROJECTS: Project[] = Array.isArray(PROJECTS) ? PROJECTS : [];

export function ProjectsScreen() {
  const { colors, accents, spacing, typography, dockClearance } = useTheme();
  const insets = useSafeAreaInsets();
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [loading, setLoading] = useState(INITIAL_PROJECTS.length === 0);
  const [error, setError] = useState<string | null>(null);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProjects();
      setProjects(Array.isArray(data) ? data : INITIAL_PROJECTS);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not refresh projects');
      setProjects(INITIAL_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const list = Array.isArray(projects) ? projects : [];

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <ScreenMeshBackground />
      <MobileNavHeader />

      {loading && list.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={accents.violet} />
          <Text style={[typography.meta, { color: colors.textMuted, marginTop: spacing.md }]}>
            Loading projects…
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={list}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: spacing.lg,
            paddingTop: spacing.lg,
            paddingBottom: dockClearance + insets.bottom,
            flexGrow: 1,
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: spacing.xl }}>
              <Text style={[typography.label, { color: accents.violet }]}>Selected work</Text>
              <Text style={[typography.hero, { color: colors.text, marginTop: 6, fontSize: 38 }]}>
                Projects
              </Text>
              <Text
                style={[
                  typography.meta,
                  { color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.md },
                ]}>
                Selected work across SaaS, automation, and AI-assisted products
              </Text>
              {error ? (
                <Pressable onPress={loadProjects} accessibilityRole="button">
                  <Text
                    style={[
                      typography.meta,
                      { color: accents.magenta, marginBottom: spacing.md },
                    ]}>
                    {error} — tap to retry
                  </Text>
                </Pressable>
              ) : null}
            </View>
          }
          ListFooterComponent={
            <View style={{ marginTop: spacing.lg }}>
              <SiteFooter />
            </View>
          }
          ListEmptyComponent={
            <View style={{ paddingVertical: spacing.xxl, alignItems: 'center' }}>
              <Text style={[typography.body, { color: colors.textMuted }]}>
                No projects to show yet.
              </Text>
              <Pressable onPress={loadProjects}>
                <Text style={[typography.meta, { color: accents.blue, marginTop: spacing.sm }]}>
                  Retry
                </Text>
              </Pressable>
            </View>
          }
          renderItem={({ item, index }) => (
            <ProjectCard
              title={item.title}
              description={item.description}
              techStack={item.techStack}
              features={item.features}
              githubUrl={item.githubUrl}
              demoUrl={item.demoUrl}
              coverImage={item.coverImage}
              accent={item.accent}
              index={index}
              featured={index === 0}
            />
          )}
          initialNumToRender={4}
          showsVerticalScrollIndicator={false}
        />
      )}
      <FloatingBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
