import { LightningElement } from 'lwc';
import adaptivecardsLib from '@salesforce/resourceUrl/adaptivecards';
import {   loadScript } from 'lightning/platformResourceLoader';
export default class Adaptivecard_child extends LightningElement {
    
    customText = 'Hey There';
    adaptiveCard ;
 
    connectedCallback() { 

        loadScript(this, adaptivecardsLib ).then(() => {  
            // Create an AdaptiveCard instance
            //var adaptiveCardObj = new adaptivecardsLib.AdaptiveCard(); 
            var adaptiveCard = new AdaptiveCards.AdaptiveCard();
  
            adaptiveCard.lwcRef = this;

           
            adaptiveCard.onExecuteAction = function(action)  {  
                //console.log('clicked 1');
                //console.log(action.url); 
                //console.log(document); 
                //console.log(action); 
                //console.log(action.parent); 
                //console.log(action.parent.lwcRef); 
                console.log(action.parent.lwcRef.customText); 
            }
            
            adaptiveCard.parse(this.card);
            // Render the card to an HTML element:
            var renderedCard = adaptiveCard.render();
            const el = this.template.querySelector('div');
            el.appendChild(renderedCard);
            console.log('Hello World');
        });
    }

    handleFormInputChange(event){
        // In 1 line, assign the value to the property
        this.customText = event.target.value;
        if(this.adaptiveCard){
            this.adaptiveCard.lwcRef = this; 
        } 
    }

    card = {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "Image",
                "url": "http://adaptivecards.io/content/adaptive-card-50.png"
            },
            {
                "type": "TextBlock",
                "text": "Hello **Adaptive Cards!**"
            }
        ],
        "actions": [
            {
                "type": "Action.OpenUrl",
                "title": "Learn more",
                "url": "http://adaptivecards.io"
            },
            {
                "type": "Action.OpenUrl",
                "title": "GitHub",
                "url": "http://github.com/Microsoft/AdaptiveCards"
            }
        ]
    };


}