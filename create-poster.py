import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import Rectangle, Circle
import numpy as np
from matplotlib import font_manager
import os

# Set up the figure
fig, ax = plt.subplots(figsize=(11, 8.5))  # Standard letter size
fig.patch.set_facecolor('#f8f6f0')  # Cream background like aged paper
ax.set_xlim(0, 11)
ax.set_ylim(0, 8.5)
ax.axis('off')

# Define colors inspired by archival systems
colors = {
    'deep_indigo': '#2c3e50',
    'warm_gray': '#95a5a6',
    'gold': '#d4af37',
    'crimson': '#c0392b',
    'cream': '#f8f6f0',
    'dark_blue': '#1a237e'
}

# Add grid system - foundational to library science
for i in range(0, 12):
    plt.axvline(x=i, color='#e0e0e0', linewidth=0.25)
for j in range(0, 9):
    plt.axhline(y=j, color='#e0e0e0', linewidth=0.25)

# Create header section with systematic organization
# Header bar
header_rect = Rectangle((0, 7.5), 11, 1, facecolor=colors['deep_indigo'], alpha=0.9)
ax.add_patch(header_rect)

# Add systematic cataloging elements
catalog_elements = [
    {'x': 0.5, 'y': 7.7, 'width': 0.1, 'height': 0.4, 'color': colors['gold']},
    {'x': 0.7, 'y': 7.7, 'width': 0.1, 'height': 0.4, 'color': colors['warm_gray']},
    {'x': 0.9, 'y': 7.7, 'width': 0.1, 'height': 0.4, 'color': colors['crimson']},
    {'x': 1.3, 'y': 7.7, 'width': 0.1, 'height': 0.4, 'color': colors['gold']},
    {'x': 1.5, 'y': 7.7, 'width': 0.1, 'height': 0.4, 'color': colors['warm_gray']},
    {'x': 1.7, 'y': 7.7, 'width': 0.1, 'height': 0.4, 'color': colors['crimson']},
]

for elem in catalog_elements:
    rect = Rectangle((elem['x'], elem['y']), elem['width'], elem['height'],
                     facecolor=elem['color'], alpha=0.8)
    ax.add_patch(rect)

# Add title with typographic precision
plt.text(2.5, 8.1, 'PROMPT SHELF', fontsize=28, fontweight='bold',
         color='white', family='serif')

# Subtitle
plt.text(2.5, 7.7, 'A Well-Curated Repository for AI Prompts', fontsize=12,
         color='#ecf0f1', family='sans-serif')

# Create main content area with structured layout
# Left panel - metadata and classification
left_panel = Rectangle((0.5, 2), 3, 5, facecolor='white', alpha=0.9,
                       edgecolor=colors['warm_gray'], linewidth=0.5)
ax.add_patch(left_panel)

# Classification headers
classification_headers = ['Classification', 'Organization', 'Access', 'Preservation']
for i, header in enumerate(classification_headers):
    plt.text(0.8, 6.5-i*0.8, header, fontsize=10, fontweight='bold',
             color=colors['deep_indigo'], family='sans-serif')

    # Add systematic dots for each category
    for j in range(5):
        circle = Circle((1.8+j*0.2, 6.4-i*0.8), 0.03, color=colors['warm_gray'])
        ax.add_patch(circle)

# Middle panel - prompt display area
middle_panel = Rectangle((4, 2), 4, 5, facecolor='white', alpha=0.95,
                         edgecolor=colors['warm_gray'], linewidth=0.5)
ax.add_patch(middle_panel)

# Simulated prompt cards with systematic arrangement
for i in range(3):
    for j in range(2):
        card_x = 4.3 + j*1.8
        card_y = 5.5 - i*1.8

        # Card outline
        card_rect = Rectangle((card_x, card_y), 1.5, 1.5, facecolor='white',
                              edgecolor=colors['warm_gray'], linewidth=0.8)
        ax.add_patch(card_rect)

        # Card content placeholders
        plt.text(card_x+0.1, card_y+1.3, f'Prompt #{i*2+j+1}', fontsize=8,
                 color=colors['deep_indigo'], family='sans-serif')

        # Simulated prompt content
        content_lines = [
            '• Systematic prompt...',
            '• Structured query...',
            '• Organized response...'
        ]

        for k, line in enumerate(content_lines):
            plt.text(card_x+0.1, card_y+1.0-k*0.2, line, fontsize=6,
                     color=colors['warm_gray'], family='monospace')

# Right panel - indexing system
right_panel = Rectangle((8.5, 2), 2, 5, facecolor='white', alpha=0.9,
                        edgecolor=colors['warm_gray'], linewidth=0.5)
ax.add_patch(right_panel)

# Indexing system visualization
plt.text(8.7, 6.8, 'Indexing System', fontsize=10, fontweight='bold',
         color=colors['deep_indigo'], family='sans-serif')

# Simulated index entries
index_entries = [
    'A - Authentication',
    'B - Business Logic',
    'C - Creative Writing',
    'D - Data Analysis',
    'E - Education',
    'F - Finance'
]

for i, entry in enumerate(index_entries):
    plt.text(8.7, 6.3-i*0.5, entry, fontsize=7,
             color=colors['warm_gray'], family='monospace')

# Footer with systematic identification
footer_rect = Rectangle((0, 0.2), 11, 0.8, facecolor=colors['deep_indigo'], alpha=0.9)
ax.add_patch(footer_rect)

# Systematic identifiers
identifiers = ['PS-2026-001', 'ARCHIVAL-INTERFACE-V1', 'PROMPT-SHELF-ORG']
for i, identifier in enumerate(identifiers):
    plt.text(0.5+i*3.5, 0.6, identifier, fontsize=8, color='white',
             family='monospace')

# Decorative elements inspired by library science
# Binding holes
for i in range(4):
    circle = Circle((0.3, 2.5+i*1.5), 0.1, facecolor='white', edgecolor=colors['warm_gray'])
    ax.add_patch(circle)

# Shelf brackets
bracket_points = [(0.2, 2), (0.2, 7), (10.8, 2), (10.8, 7)]
for point in bracket_points:
    bracket = Rectangle((point[0]-0.1, point[1]-0.05), 0.2, 0.1,
                        facecolor=colors['deep_indigo'])
    ax.add_patch(bracket)

# Add subtle texture to mimic paper
np.random.seed(42)
for _ in range(200):
    x = np.random.uniform(0, 11)
    y = np.random.uniform(0, 8.5)
    circle = Circle((x, y), 0.01, color=colors['warm_gray'], alpha=0.1)
    ax.add_patch(circle)

# Save as PDF
plt.tight_layout()
plt.savefig('/Users/senthilpalanivelu/promptshelf/prompt-shelf-poster.pdf',
            dpi=300, bbox_inches='tight', facecolor=fig.get_facecolor())
plt.close()

print("Poster created successfully at /Users/senthilpalanivelu/promptshelf/prompt-shelf-poster.pdf")