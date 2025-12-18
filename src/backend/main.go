package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "os"
    "strings"
)

type ProblemDetail struct {
    Type        string  `json:"type"`       // Primary identifier for the problem type. Should be an absolute and resolvable URI, that points to a human readable documentation for the problem type
    Status      int     `json:"status"`     // The same status code used in the HTTP response.
    Title       string  `json:"title"`      // Short, human-readable summary of the problem type
    Detail      string  `json:"detail"`     // Human-readable explanation about how to correct the problem.
    Instance    string  `json:"instance"`   // Unique identifier of the problem occurance for the server
}

type Node struct {
    Id          string              `json:"id"`
    Labels      []string            `json:"labels"`
    Properties  map[string]string   `json:"properties"`
}

type Rel struct {
    Id          string  `json:"id"`
    Type        string  `json:"type"`
    From        string  `json:"from"`
    To          string  `json:"to"`
    Properties  map[string]string   `json:"properties"`
}

type Graph struct {
    Nodes   []Node  `json:"nodes"`
    Rels    []Rel   `json:"rels"`
}

var graph Graph

func handleError(w http.ResponseWriter, instance string, status int) {
    var problemDetail ProblemDetail
    problemDetail.Status = status
    problemDetail.Instance = instance

    w.Header().Set("Content-Type", "application/problem+json")
    w.Header().Set("Content-Language", "en")
    w.WriteHeader(status)

    switch instance {
    case "/graph/0":
        problemDetail.Type = "node-not-found"
        problemDetail.Title = "Node with ID does not exist in graph"
        problemDetail.Detail = "Check if the ID is valid. For example get the full graph with GET /graph"
    case "/graph/1":
        problemDetail.Type = "constant-id"
        problemDetail.Title = "Cannot change ID"
        problemDetail.Detail = "Remove the ID field in update data"
    default:
        problemDetail.Type = "method-not-allowed"
        problemDetail.Title = "Method is not supported"
        problemDetail.Detail = "You can find the API documentation here: ???"
        problemDetail.Instance = "/0"
    }

    json.NewEncoder(w).Encode(problemDetail)
}

func getGraph(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    err := json.NewEncoder(w).Encode(graph)
    if err != nil {
        log.Fatal(err)
    }
}

func getNode(w http.ResponseWriter, r *http.Request) {
    id := strings.TrimPrefix(r.URL.Path, "/graph/")
    for _, node := range graph.Nodes {
        if node.Id == id {
            json.NewEncoder(w).Encode(node)
            return
        }
    }
    handleError(w, "/graph/0", http.StatusNotFound)
}

// func createItem(w http.ResponseWriter, r *http.Request) {
//     var item Item
//     json.NewDecoder(r.Body).Decode(&item)
//     graph = append(graph, item)
//     err := saveList(graph)
//     if err != nil {
//         log.Fatal(err)
//     }
//     w.WriteHeader(http.StatusCreated)
//     json.NewEncoder(w).Encode(item)
// }

func updateNode(w http.ResponseWriter, r *http.Request) {
    id := strings.TrimPrefix(r.URL.Path, "/graph/")
    for idx, node := range graph.Nodes {
        if node.Id == id {
            var newNode Node
            // json.NewDecoder(r.Body).Decode(&graph.Nodes[idx])
            json.NewDecoder(r.Body).Decode(&newNode)
            if len(newNode.Id) != 0 && newNode.Id != node.Id {
                handleError(w, "/graph/1", http.StatusBadRequest)
                return
            }
            graph.Nodes[idx] = newNode
            fmt.Println(graph.Nodes[idx])
            err := saveList(graph)
            if err != nil {
                log.Fatal(err)
            }
            w.WriteHeader(http.StatusOK)
            json.NewEncoder(w).Encode(graph.Nodes[idx])
            return
        }
    }
    handleError(w, "/graph/0", http.StatusNotFound)
}

// func deleteItem(w http.ResponseWriter, r *http.Request) {
//     id := strings.TrimPrefix(r.URL.Path, "/graph/")
//     for i, item := range graph {
//         if item.ID == id {
//             graph = append(graph[:i], graph[i+1:]...)
//             err := saveList(graph)
//             if err != nil {
//                 log.Fatal(err)
//             }
//             w.WriteHeader(http.StatusNoContent)
//             return
//         }
//     }
//     http.NotFound(w, r)
// }

func loadList(file string, graph *Graph) error {
    content, err := os.ReadFile(file)
    if err != nil {
        log.Fatal(err)
    }
    err = json.Unmarshal(content, graph)
    if err != nil {
        log.Fatal(err)
    }
    return nil
}

func saveList(graph Graph) error {
    b, err := json.Marshal(graph)
    if err != nil {
        return err
    }
    err = os.WriteFile("graph.json", b, 0666)
    if err != nil {
        return err
    }
    return nil
}

func main() {
    err := loadList("graph.json", &graph)
    if err != nil {
        log.Fatal(err)
    }

    http.HandleFunc("/graph", getGraph)
    http.HandleFunc("/graph/", func(w http.ResponseWriter, r *http.Request) {
        switch r.Method {
        case http.MethodGet:
            getNode(w, r)
    //     case http.MethodPost:
    //         createItem(w, r)
        case http.MethodPut:
            updateNode(w, r)
    //     case http.MethodDelete:
    //         deleteItem(w, r)
        default:
            handleError(w, "/0", http.StatusMethodNotAllowed)
        }
    })

    fmt.Println("Server running on http://localhost:8080")
    log.Fatal(http.ListenAndServe(":8080", nil))
}
