import { Image } from 'expo-image';
import { useLocalSearchParams, router } from 'expo-router';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';

import { GLP1Badge } from '@/components/recipes';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Spacing, StanfordColors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { getRecipeById } from '@/lib/recipes';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = getRecipeById(id);
  const iconColor = useThemeColor({}, 'icon');
  const borderColor = useThemeColor({}, 'border');

  if (!recipe) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Recipe not found</ThemedText>
      </ThemedView>
    );
  }

  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.heroImage} contentFit="cover" />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.content}>
          <ThemedText type="title" style={styles.title} lightColor="#2E7D32" darkColor="#66BB6A">
            {recipe.title}
          </ThemedText>

          <View style={styles.metaRow}>
            <MetaItem icon="clock" value={`${totalTime} min`} iconColor={iconColor} />
            <MetaItem
              icon="person.2"
              value={`${recipe.servings} serving${recipe.servings > 1 ? 's' : ''}`}
              iconColor={iconColor}
            />
            <MetaItem icon="flame" value={`${recipe.nutrition.calories} cal`} iconColor={iconColor} />
          </View>

          <GLP1Badge protein={recipe.nutrition.protein} isGlp1Friendly={recipe.isGlp1Friendly} />

          {recipe.glp1Notes && (
            <View style={[styles.glp1TipBox, { borderColor }]}>
              <ThemedText type="defaultSemiBold" style={styles.glp1TipTitle}>
                GLP-1 Tip
              </ThemedText>
              <ThemedText style={styles.glp1TipText}>{recipe.glp1Notes}</ThemedText>
            </View>
          )}

          <ThemedText style={styles.description}>{recipe.description}</ThemedText>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Nutrition
            </ThemedText>
            <View style={styles.nutritionGrid}>
              <NutritionItem label="Protein" value={`${recipe.nutrition.protein}g`} />
              <NutritionItem label="Carbs" value={`${recipe.nutrition.carbs}g`} />
              <NutritionItem label="Fat" value={`${recipe.nutrition.fat}g`} />
              <NutritionItem label="Calories" value={`${recipe.nutrition.calories}`} />
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Ingredients
            </ThemedText>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <ThemedText style={styles.ingredientAmount}>{ingredient.amount}</ThemedText>
                <ThemedText style={styles.ingredientName}>{ingredient.name}</ThemedText>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Instructions
            </ThemedText>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionRow}>
                <View style={styles.stepNumber}>
                  <ThemedText style={styles.stepNumberText}>{index + 1}</ThemedText>
                </View>
                <ThemedText style={styles.instructionText}>{instruction}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function MetaItem({
  icon,
  value,
  iconColor,
}: {
  icon: 'clock' | 'person.2' | 'flame';
  value: string;
  iconColor: string;
}) {
  return (
    <View style={styles.metaItem}>
      <IconSymbol name={icon} size={16} color={iconColor} />
      <ThemedText style={styles.metaValue}>{value}</ThemedText>
    </View>
  );
}

function NutritionItem({ label, value }: { label: string; value: string }) {
  const borderColor = useThemeColor({}, 'border');

  return (
    <View style={[styles.nutritionItem, { borderColor }]}>
      <ThemedText style={styles.nutritionValue}>{value}</ThemedText>
      <ThemedText style={styles.nutritionLabel}>{label}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 280,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Spacing.screenHorizontal,
    gap: Spacing.md,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  metaRow: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaValue: {
    fontSize: 14,
    opacity: 0.7,
  },
  glp1TipBox: {
    backgroundColor: StanfordColors.beige,
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: StanfordColors.cardinal,
  },
  glp1TipTitle: {
    color: StanfordColors.cardinalDark,
    marginBottom: 4,
  },
  glp1TipText: {
    color: StanfordColors.cardinalDark,
    fontSize: 14,
    lineHeight: 20,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.8,
  },
  section: {
    marginTop: Spacing.sm,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  nutritionItem: {
    flex: 1,
    minWidth: '45%',
    padding: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  nutritionLabel: {
    fontSize: 13,
    opacity: 0.6,
    marginTop: 2,
  },
  ingredientRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  ingredientAmount: {
    width: 100,
    fontWeight: '600',
    fontSize: 14,
  },
  ingredientName: {
    flex: 1,
    fontSize: 14,
  },
  instructionRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: StanfordColors.cardinal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  instructionText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
});
