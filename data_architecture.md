# Data Visualization Guide & Architecture

## 1. Common Chart Types for Data Analytics

Here are the most common chart types used in business intelligence and when to use them:

| Chart Type | Best Use Case | Example |
| :--- | :--- | :--- |
| **Bar Chart** (Biểu đồ cột) | Comparing values across categories. | Sales by Product Category, Revenue by Month. |
| **Line Chart** (Biểu đồ đường) | Showing trends over time. | Stock prices, Website traffic over a year. |
| **Pie / Doughnut Chart** (Biểu đồ tròn) | Showing composition or parts of a whole (best for < 5 categories). | Market Share, Expenses breakdown. |
| **Scatter Plot** (Biểu đồ phân tán) | Showing correlation between two variables. | Advertising spend vs. Sales revenue. |
| **Area Chart** (Biểu đồ miền) | similar to line charts but highlights the magnitude of change. | Accumulated revenue over time. |
| **Heatmap** | Visualizing data density or intensity in a matrix. | User activity by hour of the day and day of week. |
| **Radar Chart** | Comparing multiple variables for a single item. | Product feature comparison (Price, Quality, Speed, Support). |

## 2. System Data Flow

Here is how the data travels from the user's Excel file to the vibrant charts on your dashboard.

```mermaid
sequenceDiagram
    participant User
    participant UploadExcel (Component)
    participant XLSX (Library)
    participant DataContext (State)
    participant DataVisualization (Component)
    participant ChartJS (Library)

    Note over User, UploadExcel: Phase 1: Ingestion
    User->>UploadExcel: Drags & Drops .xlsx/.csv file
    UploadExcel->>UploadExcel: Reads file (FileReader)
    UploadExcel->>XLSX: Parse binary string to JSON
    XLSX-->>UploadExcel: Returns Array of Objects
    
    Note over UploadExcel, DataContext: Phase 2: State Management
    UploadExcel->>DataContext: setParsedData(data)
    DataContext->>DataContext: Updates Global State (React Context)
    
    Note over DataContext, DataVisualization: Phase 3: Transformation
    DataVisualization->>DataContext: Consumes { data }
    DataVisualization->>DataVisualization: useMemo() processes data
    DataVisualization->>DataVisualization: Aggregates totals (GroupBy Category, Region)
    DataVisualization->>DataVisualization: Formats for Chart.js
    
    Note over DataVisualization, ChartJS: Phase 4: Rendering
    DataVisualization->>ChartJS: Passes { labels, datasets }
    ChartJS-->>User: Renders Canvas (Bar, Line, Doughnut)
```

## 3. Current Implementation Details

- **Input**: We use `react-dropzone` to capture the file.
- **Parsing**: `xlsx` library converts the spreadsheet rows into a JSON array.
- **Storage**: We use React Context (`DataContext`) to hold this array in memory so any component (Preview, Charts, AI) can access it without re-parsing.
- **Visualization**: `react-chartjs-2` (wrapper for Chart.js) renders the graphics.
