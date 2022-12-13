package virtusatask;

public class BubbleSort {
    public static void main(String[] args) {
        int bsArray[]={9,8,7,5,6};
        System.out.println("Before sorting elements are: ");
        for(int i: bsArray){
            System.out.print(i+ "\t");
        }
        
        bubbleSort(bsArray);
        System.out.println("\nAfter sorting elements are: ");
        for(int i: bsArray){
            System.out.print(i + "\t");
        }
    }
    
    public static void bubbleSort(int[] bsArray){
        int temp=0;  //used for swapping
        for(int i=0; i<bsArray.length; i++){            
            for(int j=1; j<(bsArray.length)-i; j++)     
                if(bsArray[j-1]>bsArray[j]){           
                    temp=bsArray[j-1];
                    bsArray[j-1]=bsArray[j];
                    bsArray[j]=temp;                    
                }
        }        
    }    
}
