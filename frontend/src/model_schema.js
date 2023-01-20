const schema = {
    "title": "A model catalog entry",
    "type": "object",
    "properties": {
        "name": {
            "title": "Name",
            "description": "Short, unique name for the model (one or two words, under 20 characters recommended)",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "description": "Detailed description of the model",
            "type": "string"
        },
        "tasks": {
            "title": "Tasks",
            "description": "Which task (or tasks) does the model perform?",
            "default": [],
            "type": "array",
            "items": {
                "$ref": "#/definitions/TaskEnum"
            }
        },
        "url": {
            "title": "URL",
            "description": "The URL of the model. This should point to scivision model yaml file.",
            "minLength": 1,
            "maxLength": 65536,
            "format": "uri",
            "type": "string"
        },
        "pkg_url": {
            "title": "Python package",
            "description": "A pip requirement specifier for PyPI, or a URL of the archive or package (on GitHub, for exampe)",
            "type": "string"
        },
        "format": {
            "title": "Model input format",
            "description": "The type of data consumed by the model",
            "type": "string"
        },
        "pretrained": {
            "title": "Pretrained model?",
            "default": true,
            "type": "boolean"
        },
        "labels_required": {
            "title": "Labels required?",
            "description": "Does the model require labeled data for training?",
            "default": true,
            "type": "boolean"
        },
        "institution": {
            "title": "Institution(s)",
            "description": "A list of institutions that produced or are associated with the model (one per item)",
            "default": [],
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "tags": {
            "title": "Tags",
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    },
    "required": ["name", "url", "pkg_url", "format", "tags"],
    "additionalProperties": false,
    "definitions": {
        "TaskEnum": {
            "title": "TaskEnum",
            "description": "An enumeration.",
            "enum": ["classification", "object-detection", "segmentation", "thresholding", "other"],
            "type": "string"
        }
    }
}

export default schema;