# Demo of using Adaptive Card in LWC

 ## Initiual Setup
 1. Create scratch org
 2. Push source code using command 
 
     `sfdx force:source:push`
 3. Assign permission set `adaptivecard` so that user can have access to Adaptive Card Tab
 
    command - `sfdx force:user:permset:assign --permsetname adaptivecard --targetusername <alias>`