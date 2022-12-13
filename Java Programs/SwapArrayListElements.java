package virtusatask;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SwapArrayListElements {
    public static void main(String[] args) {
        List<Integer> list= new ArrayList<>();
        list.add(11);  //index: 0
        list.add(22);   //1
        list.add(33);   //2
        list.add(44);   //3
        System.out.println("Elements before swapping: "+ list);
        Collections.swap(list, 1, 3); //list is passed and 1st and 3rd index elements are swapped
        System.out.println("Elements after swapping 22 and 33: "+ list);
    }    
}
