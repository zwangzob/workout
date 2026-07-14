import { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { GymProfileSheet } from '@/components/GymProfileSheet';
import { colors, radii, spacing, typography } from '@/theme/theme';
import { useGymStore } from '@/store/gymStore';
import { useProgramStore } from '@/store/programStore';
import { tap, tapLight } from '@/lib/haptics';
import { GymProfile } from '@/types';

export default function ProfileScreen() {
  const profiles = useGymStore((s) => s.profiles);
  const activeProfileId = useGymStore((s) => s.activeProfileId);
  const setActiveProfile = useGymStore((s) => s.setActiveProfile);
  const addProfile = useGymStore((s) => s.addProfile);
  const updateProfile = useGymStore((s) => s.updateProfile);
  const removeProfile = useGymStore((s) => s.removeProfile);

  const programs = useProgramStore((s) => s.programs);
  const activeProgramId = useProgramStore((s) => s.activeProgramId);
  const setActiveProgram = useProgramStore((s) => s.setActiveProgram);

  const [editingProfile, setEditingProfile] = useState<GymProfile | undefined>(undefined);
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.screenTitle}>Settings</Text>

        <Section
          title="Gym Profiles"
          action={
            <Pressable
              onPress={() => {
                tap();
                setEditingProfile(undefined);
                setSheetVisible(true);
              }}
              hitSlop={8}
            >
              <Ionicons name="add-circle" size={22} color={colors.accent} />
            </Pressable>
          }
        >
          {profiles.map((profile) => {
            const active = profile.id === activeProfileId;
            return (
              <Pressable
                key={profile.id}
                style={styles.row}
                onPress={() => {
                  tapLight();
                  setEditingProfile(profile);
                  setSheetVisible(true);
                }}
              >
                <Pressable onPress={() => { tapLight(); setActiveProfile(profile.id); }} hitSlop={8}>
                  <Ionicons
                    name={active ? 'radio-button-on' : 'radio-button-off'}
                    size={20}
                    color={active ? colors.accent : colors.textTertiary}
                  />
                </Pressable>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>{profile.name}</Text>
                  <Text style={styles.rowMeta}>{profile.availableEquipment.length} equipment types</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
              </Pressable>
            );
          })}
        </Section>

        <Section
          title="Programs"
          action={
            <Pressable onPress={() => { tap(); router.push('/program/new'); }} hitSlop={8}>
              <Ionicons name="add-circle" size={22} color={colors.accent} />
            </Pressable>
          }
        >
          {programs.length === 0 ? (
            <Text style={styles.empty}>No programs yet. Create one to get started.</Text>
          ) : (
            programs.map((program) => {
              const active = program.id === activeProgramId;
              return (
                <Pressable key={program.id} style={styles.row} onPress={() => { tapLight(); router.push(`/program/${program.id}`); }}>
                  <Pressable onPress={() => { tapLight(); setActiveProgram(program.id); }} hitSlop={8}>
                    <Ionicons
                      name={active ? 'radio-button-on' : 'radio-button-off'}
                      size={20}
                      color={active ? colors.accent : colors.textTertiary}
                    />
                  </Pressable>
                  <View style={styles.rowText}>
                    <Text style={styles.rowTitle}>{program.name}</Text>
                    <Text style={styles.rowMeta}>{program.weeks.length} week program</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
                </Pressable>
              );
            })
          )}
        </Section>

        <Section title="Training">
          <Pressable style={styles.row} onPress={() => { tapLight(); router.push('/training-max'); }}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Training Max</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </Pressable>
        </Section>

        <Section title="Export">
          <Pressable style={styles.row} onPress={() => { tapLight(); router.push('/export-workout'); }}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Export Workout</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </Pressable>
        </Section>
      </ScrollView>

      <GymProfileSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        profile={editingProfile}
        onSave={(values) => {
          if (editingProfile) {
            updateProfile(editingProfile.id, values);
          } else {
            addProfile(values);
          }
        }}
        onDelete={editingProfile ? () => removeProfile(editingProfile.id) : undefined}
      />
    </SafeAreaView>
  );
}

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {action}
      </View>
      <Card style={{ gap: spacing.sm }} elevated>
        {children}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  screenTitle: {
    ...typography.title,
    color: colors.textPrimary,
  },
  section: {
    gap: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.micro,
    color: colors.textTertiary,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  rowMeta: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 2,
  },
  empty: {
    ...typography.body,
    color: colors.textTertiary,
  },
});
