package webprog.oblig3data17003;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BillettController {

    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagre")
    public void lagre(Billett bestilling) {
        rep.lagreBillett(bestilling);
    }

    @GetMapping("/hentAlle")
    public List<Billett> visAlleBilletter() {
        return rep.hentAlleBilletter();
    }

    @GetMapping("/slettAlle")
    public void slettAlleBilletter(){
        rep.slettAlleBilletter();
    }
}
