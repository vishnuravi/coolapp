import { router } from 'expo-router';
import { useState, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Pressable } from 'react-native';

import { RecipeCard } from '@/components/recipes';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing, StanfordColors } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import { sampleRecipes, Recipe, RecipeCategory } from '@/lib/recipes';

const categories: { key: RecipeCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'breakfast', label: 'Breakfast' },
  { key: 'lunch', label: 'Lunch' },
  { key: 'dinner', label: 'Dinner' },
  { key: 'snack', label: 'Snacks' },
  { key: 'smoothie', label: 'Smoothies' },
];

export default function RecipesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');

  const filteredRecipes = useMemo(() => {
    if (selectedCategory === 'all') {
      return sampleRecipes;
    }
    return sampleRecipes.filter((recipe) => recipe.category === selectedCategory);
  }, [selectedCategory]);

  const handleRecipePress = (recipe: Recipe) => {
    router.push(`/recipes/${recipe.id}`);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Recipes</ThemedText>
        <ThemedText style={styles.subtitle}>Healthy meals for your GLP-1 journey</ThemedText>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesScroll}
      >
        {categories.map((category) => (
          <CategoryPill
            key={category.key}
            label={category.label}
            isSelected={selectedCategory === category.key}
            onPress={() => setSelectedCategory(category.key)}
          />
        ))}
      </ScrollView>

      <ScrollView style={styles.recipeList} contentContainerStyle={styles.recipeListContent}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} onPress={handleRecipePress} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <ThemedText style={styles.emptyText}>No recipes in this category yet.</ThemedText>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

interface CategoryPillProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

function CategoryPill({ label, isSelected, onPress }: CategoryPillProps) {
  const backgroundColor = useThemeColor({}, 'background');
  const borderColor = useThemeColor({}, 'border');

  return (
    <Pressable
      style={[
        styles.pill,
        { borderColor },
        isSelected && styles.pillSelected,
        !isSelected && { backgroundColor },
      ]}
      onPress={onPress}
    >
      <ThemedText
        style={[styles.pillText, isSelected && styles.pillTextSelected]}
        lightColor={isSelected ? '#fff' : undefined}
        darkColor={isSelected ? '#fff' : undefined}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Spacing.screenTop,
  },
  header: {
    paddingHorizontal: Spacing.screenHorizontal,
    marginBottom: Spacing.md,
  },
  subtitle: {
    opacity: 0.7,
    marginTop: 4,
  },
  categoriesScroll: {
    maxHeight: 44,
    marginBottom: Spacing.md,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.screenHorizontal,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  pillSelected: {
    backgroundColor: StanfordColors.cardinal,
    borderColor: StanfordColors.cardinal,
  },
  pillText: {
    fontSize: 14,
    fontWeight: '500',
  },
  pillTextSelected: {
    color: '#fff',
  },
  recipeList: {
    flex: 1,
  },
  recipeListContent: {
    paddingHorizontal: Spacing.screenHorizontal,
    paddingBottom: Spacing.xl,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
  },
  emptyText: {
    opacity: 0.6,
  },
});
