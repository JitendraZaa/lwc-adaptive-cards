
import { LightningElement } from 'lwc';
import adaptivecardsLib from '@salesforce/resourceUrl/adaptivecards';
import {   loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Adaptivecard_demo extends LightningElement {
    
    customText = 'Jitendra Zaa';
    adaptiveCard ;
 
    connectedCallback() {  
        loadScript(this, adaptivecardsLib ).then(() => {  
            // Create an AdaptiveCard instance 
            var adaptiveCard = new AdaptiveCards.AdaptiveCard();
            //Let adaptive card know that its running context is LWC
            adaptiveCard.lwcRef = this; 
           
            adaptiveCard.onExecuteAction = function(action)  {  
                //Get LWC runtime back from Adaptive card instance
                var lwcContext = action.parent.lwcRef ;
                lwcContext.greenMessage('Event in Adaptive Card','Reading Value from LWC - '+lwcContext.customText); 
                lwcContext.yellowMessage('URL',action.url); 
                lwcContext.yellowMessage('Button Title',action.title); 
            }
            
            adaptiveCard.parse(this.card);
            // Render the card to an HTML element:
            var renderedCard = adaptiveCard.render();
            const el = this.template.querySelector('div');
            el.appendChild(renderedCard); 
        });
    } 
    handleFormInputChange(event){ 
        this.customText = event.target.value; 
    }

    greenMessage(title,body){
        const event = new ShowToastEvent({
            title: title,
            message: body,
            variant: 'success'
        });
        this.dispatchEvent(event);
    }
    yellowMessage(title,body){
        const event = new ShowToastEvent({
            title: title,
            message: body,
            variant: 'warning'
        });
        this.dispatchEvent(event);
    }

    card = {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type": "Image",
                "url": "https://docs.microsoft.com/en-us/adaptive-cards/content/videoposter.png",
                "width": "400px", 
            },
            {
                "type": "TextBlock",
                "text": "This is text component"
            }
        ],
        "actions": [
            {
                "type": "Action.OpenUrl",
                "title": "Learn more",
                "url": "http://adaptivecards.io",
                "style":"positive"
            },
            {
                "type": "Action.OpenUrl",
                "title": "GitHub",
                "url": "http://github.com/Microsoft/AdaptiveCards"
            }
        ]
    };


}