module.exports = {
  "title": "Ultimate-X-Comparison",
  "subtitle": "Ultimate X comparison framework",
  "selectTitle": "Criteria",
  "tableTitle": "Comparison of ...",
  "repository": {
    "template": "https://github.com/ultimate-comparisons/{}.git",
    "variables": [
      "title"
    ]
  },
  "details": {
    "header": {
      "nameRef": "id",
      "labelRef": "",
      "urlRef": "id"
    },
    "body": {
      "title": "Short Description",
      "bodyRef": "ShortDescription"
    },
    "tooltipAsText": false
  },
  "criteria": [
    {
      "id": {
        "name": "Name",
        "search": false,
        "table": true,
        "detail": false,
        "type": "name-url"
      }
    },
    {
      "ShortDescription": {
        "name": "Short Description",
        "search": false,
        "detail": false,
        "table": true,
        "order": "1",
        "type": "markdown"
      }
    },
    {
      "default-id": {
        "ignore": true,
        "id": "id",
        "name": "Name",
        "search": false,
        "table": true,
        "description": "",
        "placeholder": "",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "name-url",
        "lock": {
          "id": true,
          "type": true,
          "detail": true
        }
      }
    },
    {
      "default-description": {
        "ignore": true,
        "id": "description",
        "name": "Description",
        "search": false,
        "table": false,
        "detail": false,
        "description": "",
        "placeholder": "",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "markdown",
        "lock": {
          "id": true,
          "type": true
        }
      }
    },
    {
      "default-text": {
        "ignore": true,
        "id": "Text-Criteria",
        "name": {
          "template": "{}",
          "variables": [
            "id"
          ]
        },
        "search": false,
        "table": true,
        "detail": true,
        "description": "",
        "placeholder": "",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "text"
      }
    },
    {
      "default-rating": {
        "ignore": true,
        "id": "Rating-Criteria",
        "name": "",
        "search": false,
        "table": false,
        "detail": false,
        "description": "",
        "placeholder": "",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "rating"
      }
    },
    {
      "default-label": {
        "ignore": true,
        "id": "Label-Criteria",
        "name": {
          "template": "{}",
          "variables": [
            "id"
          ]
        },
        "search": true,
        "table": true,
        "detail": true,
        "description": {
          "template": "Default description for {}",
          "variables": [
            "name"
          ]
        },
        "placeholder": {
          "template": "Select {} ...",
          "variables": [
            "name"
          ]
        },
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "label"
      }
    },
    {
      "default-markdown": {
        "ignore": true,
        "id": "Markdown-Criteria",
        "name": {
          "template": "{}",
          "variables": [
            "id"
          ]
        },
        "search": false,
        "table": true,
        "detail": true,
        "description": "",
        "placeholder": "",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "markdown"
      }
    },
    {
      "default-name-url": {
        "ignore": true,
        "id": "Name-Url-Criteria",
        "name": {
          "template": "{}",
          "variables": [
            "id"
          ]
        },
        "search": false,
        "table": true,
        "detail": false,
        "description": "",
        "placeholder": "",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "name-url"
      }
    },
    {
      "default-repository": {
        "ignore": true,
        "id": "Repository-Criteria",
        "name": {
          "template": "{}",
          "variables": [
            "id"
          ]
        },
        "search": false,
        "table": false,
        "detail": false,
        "description": "",
        "placeholder": "Select development status...",
        "order": "",
        "andSearch": false,
        "rangeSearch": false,
        "type": "repository"
      }
    },
    {
      "default-color": {
        "ignore": true,
        "values": {
          "1": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(15, 100%, 70%)"
          },
          "2": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(30, 100%, 70%)"
          },
          "3": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(45, 100%, 70%)"
          },
          "4": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(60, 100%, 70%)"
          },
          "5": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(75, 100%, 70%)"
          },
          "6": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(90, 100%, 70%)"
          },
          "7": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(105, 100%, 70%)"
          },
          "8": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(120, 100%, 70%)"
          },
          "9": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(135, 100%, 70%)"
          },
          "10": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(150, 100%, 70%)"
          },
          "11": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(165, 100%, 70%)"
          },
          "12": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(180, 100%, 70%)"
          },
          "13": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(195, 100%, 70%)"
          },
          "14": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(210, 100%, 70%)"
          },
          "15": {
            "color": "#ffff00",
            "backgroundColor": "hsl(225, 100%, 70%)"
          },
          "16": {
            "color": "#ffff00",
            "backgroundColor": "hsl(240, 100%, 70%)"
          },
          "17": {
            "color": "#ffff00",
            "backgroundColor": "hsl(255, 100%, 70%)"
          },
          "18": {
            "color": "#ffff00",
            "backgroundColor": "hsl(270, 100%, 70%)"
          },
          "19": {
            "color": "#ffff00",
            "backgroundColor": "hsl(285, 100%, 70%)"
          },
          "20": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(300, 100%, 70%)"
          },
          "21": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(315, 100%, 70%)"
          },
          "22": {
            "color": "#0d0d0d",
            "backgroundColor": "hsl(330, 100%, 70%)"
          }
        }
      }
    }
  ]
};
